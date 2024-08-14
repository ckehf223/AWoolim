import React, { useEffect, useState } from "react";
import "/src/css/member/groupnav.css";
import CalendarPage from "/src/components/member/CalendarPage";
import PhotoGallery from "/src/components/member/PhotoGallery";
import MyClubDetailInfo from "/src/components/member/MyClubDetailInfo";
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
