import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "/src/css/member/header.css";
import { useAuth } from "/src/common/AuthContext";
import instance from "/src/common/auth/axios"; // Axios 인스턴스 가져오기

// 알림 웹소켓 URL
const SOCKET_URL = "ws://localhost:8080/ws/alarms";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState(null); // 프로필 정보를 위한 상태 추가
  const searchInputRef = useRef(null);
  const socketRef = useRef(null);

  // 프로필 정보를 가져오는 함수
  const fetchProfile = async () => {
    try {
      const response = await instance.get("/member/getProfile", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(response.data);
    } catch (error) {
      console.error("프로필 정보 가져오기 오류:", error);
    }
  };

  // 웹소켓 연결 및 알림 수신
  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile(); // 로그인된 상태에서만 프로필 정보를 가져옴

      // 웹소켓 연결
      socketRef.current = new WebSocket(SOCKET_URL);

      socketRef.current.onopen = () => {
        console.log("Connected to WebSocket for notifications");
      };

      socketRef.current.onmessage = (event) => {
        const message = event.data;

        try {
          // JSON으로 파싱을 시도
          const jsonMessage = JSON.parse(message);

          // JSON 파싱에 성공한 경우 알림으로 처리
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            jsonMessage,
          ]);
        } catch (error) {
          // 메시지가 JSON이 아닐 경우 처리
          console.warn("Received a non-JSON message:", message);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      return () => {
        if (socketRef.current) {
          socketRef.current.close();
        }
      };
    }
  }, [isAuthenticated]);

  const handleAlarmClick = () => {
    setShowNotifications(!showNotifications);

    // 알림 읽음 처리 로직 추가
    if (!showNotifications) {
      markNotificationsAsRead();
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      const alarmNos = notifications
        .filter((n) => n.isRead === 0)
        .map((n) => n.alarmNo);

      if (alarmNos.length === 0) {
        console.warn("No unread notifications to mark as read.");
        return;
      }

      console.log("Sending alarmNos:", alarmNos);

      const response = await instance.post(
        "/api/notifications/read",
        alarmNos,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((n) => ({ ...n, isRead: 1 }))
        );
      } else {
        console.error("Failed to mark notifications as read");
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    const searchTerm = searchInputRef.current.value.trim(); // 검색어의 공백 제거
    if (searchTerm === "") {
      return;
    }
    navigate("/search", { state: { searchTerm } });
  };

  return (
    <header id="header">
      <div id="header-logo">
        <Link to="/">
          <img src="/src/assets/images/headerLogo.png" alt="로고" />
        </Link>
      </div>

      <div id="header-search">
        <input
          type="search"
          placeholder="검색어를 입력하세요"
          ref={searchInputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/search" onClick={handleSearchClick}>
          <img src="/src/assets/images/search.png" alt="검색" />
        </Link>
      </div>

      <div id="header-icons">
        <div onClick={handleAlarmClick}>
          <img src="/src/assets/images/notice.png" alt="알림" id="alarm-icon" />
          {notifications.filter((n) => n.isRead === 0).length > 0 && (
            <span className="notification-count">
              {notifications.filter((n) => n.isRead === 0).length}
            </span>
          )}
        </div>

        {showNotifications && (
          <div className="notifications">
            {notifications.length > 0 ? (
              notifications
                .filter((notification) => notification.isRead === 0)
                .map((notification, index) => (
                  <div key={index} className="notification-item">
                    {notification.message}
                  </div>
                ))
            ) : (
              <div className="no-notifications">읽지 않은 알림이 없습니다.</div>
            )}
          </div>
        )}

        <button
          id="mypage-button"
          onClick={() => {
            navigate("/customercenter");
          }}
        >
          고객센터
        </button>

        <button
          id="mypage-button"
          onClick={() => {
            isAuthenticated ? navigate("/mypage/profile") : navigate("/login");
          }}
        >
          마이페이지
        </button>

        {!isAuthenticated ? (
          <button
            id="login-button"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
        ) : (
          <button
            id="login-button"
            onClick={() => {
              logout();
            }}
          >
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
