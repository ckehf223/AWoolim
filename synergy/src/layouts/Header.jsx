import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/src/css/header.css";

function Header() {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // 예시: 100px 이상 스크롤하면 헤더 숨김
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [showNotifications, setShowNotifications] = useState(false);

  const sampleNotifications = [
    { message: "새로운 모임 초대가 있습니다." },
    { message: "모임 신청이 승인되었습니다." },
    { message: "댓글에 새로운 답글이 달렸습니다." },
  ];

  const handleAlarmClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header id="header">
      {/* 로고 */}
      <div id="header-logo">
        <Link to="/">
          <img src="./src/images/headerLogo.png" alt="로고" />
        </Link>
      </div>

      {/* 검색창 */}
      <div id="header-search">
        <input type="search" placeholder="검색어를 입력하세요" />
        <Link to="/search">
          <img src="./src/images/search.png" alt="검색" />
        </Link>
      </div>

      {/* 아이콘 */}
      <div id="header-icons">
        {/* 알림 */}
        <div onClick={handleAlarmClick}>
          <img src="./src/images/notice.png" alt="알림" id="alarm-icon" />
        </div>

        {/* 알림 내용 표시 */}
        {showNotifications && (
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
            /* 고객센터 페이지 이동 로직 추가 */
          }}
        >
          고객센터
        </button>

        <button
          id="mypage-button"
          onClick={() => {
            /* 마이페이지 이동 로직 추가 */
          }}
        >
          마이페이지
        </button>

        <button
          id="login-button"
          onClick={() => {
            /* 로그인 페이지 이동 로직 추가 */
          }}
        >
          로그인
        </button>
      </div>
    </header>
  );
}

export default Header;
