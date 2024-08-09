import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/src/css/member/clubitem.css";

function ClubItem({ club, backgroundColor = "#ffffff" }) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/clubs/image/${club.clubImage}`)
      .then((response) => response.blob())
      .then((blob) => {
        const imageURL = URL.createObjectURL(blob);
        setImageData(imageURL);
      })
      .catch((error) => {
        console.error("Error fetching club image:", error);
      });
  }, [club.clubImage]);

  return (
    <div className="slide-item">
      <Link to={`/details/${club.clubNo}`}>
        {imageData ? (
          <img className="categoryImg" src={imageData} alt={club.clubTitle} />
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
