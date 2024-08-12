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
  const [searchTerm, setSearchTerm] = useState(""); // searchTerm 상태 정의 및 초기화
  const [notifications, setNotifications] = useState([]); // 초기값을 빈 배열로 설정
  const searchInputRef = useRef(null);
  const socketRef = useRef(null);

  // 서버로부터 읽지 않은 알림 데이터를 가져오는 함수
  const fetchUnreadNotifications = async () => {
    try {
      const response = await instance.get("/api/notifications/read", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = Array.isArray(response.data) ? response.data : []; // 배열로 강제 변환
      setNotifications(data);

      if (data.length === 0) {
        console.log("읽지 않은 알림이 없습니다.");
      }
    } catch (error) {
      console.error("Failed to fetch unread notifications:", error);
    }
  };

  // 알림을 읽음 처리하는 함수
  const markAlarmAsRead = async (alarmNo) => {
    try {
      const response = await instance.post(
        "/api/notifications/mark-as-read",
        [alarmNo],
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // 알림 목록에서 해당 알림을 제거
        setNotifications((prevNotifications) =>
          prevNotifications.filter((n) => n.alarmNo !== alarmNo)
        );
      } else {
        console.error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // 웹소켓 연결 및 초기 알림 데이터 가져오기
  useEffect(() => {
    if (isAuthenticated) {
      socketRef.current = new WebSocket(SOCKET_URL);

      socketRef.current.onopen = () => {
        console.log("Connected to WebSocket for notifications");
        fetchUnreadNotifications(); // 서버로부터 데이터를 가져옴
      };

      socketRef.current.onmessage = (event) => {
        const message = event.data;
        console.log("WebSocket message received:", message);

        try {
          const alarm = JSON.parse(message); // JSON 형식으로 파싱
          console.log("Parsed alarm message:", alarm);
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            alarm, // 새로운 알림 추가
          ]);
        } catch (error) {
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

  const handleSearchClick = (event) => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      navigate("/search", { state: { searchTerm: trimmedSearchTerm } });
    }
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearchClick}>
          <img src="/src/assets/images/search.png" alt="검색" />
        </button>
      </div>

      <div id="header-icons">
        <div>
          <img
            src="/src/assets/images/notice.png"
            alt="알림"
            id="alarm-icon"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {notifications.filter((n) => n.isRead === 0).length > 0 && (
            <span className="notification-count">
              {notifications.filter((n) => n.isRead === 0).length}
            </span>
          )}
        </div>

        {showNotifications && (
          <div className="notifications">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`notification-item ${
                    notification.isRead === 0 ? "unread" : ""
                  }`}
                  onClick={() => markAlarmAsRead(notification.alarmNo)} // 클릭 시 알림을 읽음 처리
                >
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
            navigate("/service/FAQ");
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
