import React, { useEffect, useState } from "react";
import "/src/css/member/service/groupnav.css";
import CalendarPage from "/src/components/member/mypage/CalendarPage";
import PhotoGallery from "/src/components/member/mypage/PhotoGallery";
import MyClubDetailInfo from "/src/components/member/mypage/MyClubDetailInfo";
import { Route, Routes } from "react-router-dom";

function GroupNav() {

  return (
    <>
      <Routes>
        <Route path="detailInfo/:no" element={<MyClubDetailInfo />} />
        <Route path="photoGallery/:no" element={<PhotoGallery />} />
        <Route path="calendar/:no" element={<CalendarPage />} />
      </Routes>
    </>
  );
}

export default GroupNav;
