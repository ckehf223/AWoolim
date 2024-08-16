import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "/src/css/member/club/clubitem.css";
import DOMPurify from "dompurify";

function ClubItem({ club, backgroundColor = "#ffffff" }) {
  useEffect(() => {
    const spanElement = document.querySelector(
      ".slide-item-content > span.clubitemdetailinfo"
    );
    if (spanElement) {
      spanElement.style.overflow = "hidden";
      spanElement.style.textOverflow = "ellipsis";
      spanElement.style.whiteSpace = "nowrap";
    }
  }, [club.detailInfo]);

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
            <span>모집 날짜: {club.dday}</span>
          </div>
          <span>
            모집 인원: {club.memberCount}/{club.maxMember}명
          </span>
          <span
            className="clubitemdetailinfo"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(club.detailInfo),
            }}
          ></span>
        </div>
      </Link>
    </div >
  );
}

export default ClubItem;