import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "/src/css/member/header.css";
import { useAuth } from "/src/common/AuthContext";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const sampleNotifications = [
    { message: "새로운 모임 초대가 있습니다." },
    { message: "모임 신청이 승인되었습니다." },
    { message: "댓글에 새로운 답글이 달렸습니다." },
  ];

  const handleAlarmClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    const searchTerm = searchInputRef.current.value;
    if (searchTerm.trim() === "") {
      return; // 검색어가 비어있으면 함수 종료
    }
    navigate("/search", { state: { searchTerm } }); // 검색어를 state에 담아 SearchPage로 이동
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
          value={searchTerm} // input 값을 state와 연결
          onChange={(e) => setSearchTerm(e.target.value)} // input 값 변경 시 state 업데이트
        />
        <Link to="/search" onClick={handleSearchClick}>
          <img src="/src/assets/images/search.png" alt="검색" />
        </Link>
      </div>

      <div id="header-icons">
        <div onClick={handleAlarmClick}>
          <img src="/src/assets/images/notice.png" alt="알림" id="alarm-icon" />
        </div>

        {showNotifications && ( // 알림 내용 조건부 렌더링
          <div className="notifications">
            {sampleNotifications.map((notification, index) => (
              <div key={index} className="notification-item">
                {notification.message}
              </div>
            ))}
          </div>
        )}

        <button
          id="mypage-button"
          onClick={() => {
            navigate("/customercenter"); // 고객센터 페이지로 이동 (예시)
          }}
        >
          고객센터
        </button>

        <button
          id="mypage-button"
          onClick={() => {
            /* 마이페이지 이동 로직 추가 */
            isAuthenticated ? nav('/mypage/profile') : nav('/login');
          }}
        >
          마이페이지
        </button>

        {!isAuthenticated ? (<button
          id="login-button"
          onClick={() => {
            /* 로그인 페이지 이동 로직 추가 */
            nav('/login');
          }}
        >
          로그인
        </button>) : (<button
          id="login-button"
          onClick={() => {
            /* 로그인 페이지 이동 로직 추가 */
            logout();
          }}
        >
          로그아웃
        </button>)}



      </div>
    </header>
  );
}

export default Header;
