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
          <span className="clubitemclubtitle">{club.clubTitle}</span>
          <div>
            <span>
              {club.city} {club.district}
            </span>
            <span> {club.category} 모임</span>
          </div>
          <div>
            <span>모임 날짜: {club.dDay}</span>
            <span>
              인원: {club.memberCount}/{club.maxMember}
            </span>
          </div>
          <span className="clubitemdetailinfo">{club.detailInfo}</span>
        </div>
      </Link>
    </div>
  );
}

export default ClubItem;
