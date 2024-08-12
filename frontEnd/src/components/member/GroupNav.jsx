import React, { useState } from "react";
import "/src/css/member/groupnav.css";
import CalendarPage from "/src/components/member/CalendarPage";
import PhotoGallery from "/src/components/member/PhotoGallery";
import ClubDetailInfo from "/src/components/member/ClubDetailInfo"; // ClubDetailInfo 추가

function GroupNav() {
  const [activeContent, setActiveContent] = useState("detailInfo"); // 초기 활성 콘텐츠를 "상세 정보"로 설정

  const handleButtonClick = (contentName) => {
    setActiveContent(contentName);
  };

  return (
    <section className="section-container2">
      <div className="button-group">
        <button
          className={activeContent === "detailInfo" ? "active" : ""}
          onClick={() => handleButtonClick("detailInfo")}
        >
          상세 정보
        </button>
        <button
          className={activeContent === "calendar" ? "active" : ""}
          onClick={() => handleButtonClick("calendar")}
        >
          캘린더
        </button>
        <button
          className={activeContent === "photoGallery" ? "active" : ""}
          onClick={() => handleButtonClick("photoGallery")}
        >
          사진첩
        </button>
      </div>

      <div className="content">
        {activeContent === "detailInfo" && <ClubDetailInfo />}
        {activeContent === "calendar" && <CalendarPage />}
        {activeContent === "photoGallery" && <PhotoGallery />}
      </div>
    </section>
  );
}

export default GroupNav;
