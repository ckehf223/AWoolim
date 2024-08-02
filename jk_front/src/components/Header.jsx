import './Header.css'
import React from "react";

function Header() {
  return (
    <header id="header">
      {/* 로고 */}
      <div id="header-logo">
        <img src="./src/images/headerLogo.png" alt="로고" />
      </div>
      {/* 검색창 */}
      <div id="header-search">
        <input type="search" placeholder="검색어를 입력하세요" />
        <a href="">
          <img src="./src/images/search.png" alt="" />
        </a>
      </div>
      {/* 알림 */}
      <div id="header-icons">
        <a href="">
          <img src="./src/images/bell.png" alt="알림" id="alarm-icon"></img>
        </a>
        <button id="mypage-button">공지사항</button>
        {/* 마이페이지 */}
        <button id="mypage-button">마이페이지</button>
        {/* 로그인 */}
        <button id="login-button">로그인</button>
      </div>
    </header>
  );
}

export default Header;
