import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/src/css/member/clubitem.css";

function ClubItem({ club, backgroundColor = "#ffffff" }) {
  return (
    <div className="slide-item">
      <Link to={`/club/${club.clubNo}`}>
        {club.clubImage ? (
          <img
            className="categoryImg"
            src={`data:image/jpeg;base64,${club.clubImage}`}
            alt={club.clubTitle}
          />
        ) : (
          <div className="image-placeholder skeleton"></div>
        )}
        <div className="slide-item-content" style={{ backgroundColor }}>
          <span>{club.clubTitle}</span>
          <span>카테고리: {club.category}</span>
          <span>
            지역: {club.city} {club.district}
          </span>
          <span>{club.regularType} 모임</span>
          <span>성별: {club.clubGender}</span>
          <span>나이 제한: {club.ageLimit}</span>
          <span>모임 날짜: {club.dDay}</span>
          <span>모집인원: {club.maxMember}</span>
        </div>
      </Link>
    </div>
  );
}

export default ClubItem;
