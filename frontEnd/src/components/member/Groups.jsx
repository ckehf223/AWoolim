import React, { useState, useEffect } from "react";
import ClubItem from "/src/components/member/ClubItem";
import "/src/css/member/groups.css";

function Groups() {
  const [clubs, setClubs] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const backgroundColor = "#f1f7ff"; // 설정할 배경색

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/club/");
        const data = await response.json();
        setClubs(data);
        setFeaturedCategories(["스포츠", "맛집탐방", "독서"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderClubItems = (category) =>
    clubs
      .filter((club) => club.category === category)
      .slice(0, 4)
      .map((club) => (
        <ClubItem
          key={club.clubNo}
          club={club}
          backgroundColor={backgroundColor}
        />
      ));

  return (
    <div id="groupDiv">
      {featuredCategories.length > 0 && (
        <>
          {[
            "핫한 소셜 클럽! 오늘 뭐해?",
            "망설이면 마감! 지금 바로 신청하세요!",
            "우리 동네, 우리들의 이야기",
          ].map((title, index) => (
            <div key={title} className="groupSection">
              <div className="groupDiv">
                <span>{title}</span>
              </div>
              <div className="groupType">
                {renderClubItems(featuredCategories[index])}
              </div>
            </div>
          ))}
        </>
      )}

      <div className="groupDiv">
        <span>모임 목록</span>
      </div>
      <div className="groupType group-list">
        {clubs.map((club) => (
          <ClubItem
            key={club.clubNo}
            club={club}
            backgroundColor={backgroundColor}
          />
        ))}
      </div>
    </div>
  );
}

export default Groups;
