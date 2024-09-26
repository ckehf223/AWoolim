import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ClubItem from "/src/components/member/club/ClubItem";
import "/src/css/member/common/category.css";

function Category() {
  const [currentCategory, setCurrentCategory] = useState("전체");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderContainerRef = useRef(null);
  const [clubs, setClubs] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const categoryColors = {
    스포츠: "#e7f4ff",
    맛집탐방: "#f4f4ff",
    독서: "#fff4f4",
    친목: "#fff4ff",
    전시: "#f4ffff",
    취미활동: "rgb(241, 250, 241)",
    스터디: "#fff4e6",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/club/");
        const data = await response.json();
        setClubs(data);
        setCategoryList([
          "전체",
          ...new Set(data.map((club) => club.category)),
        ]);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setCurrentSlide(0);
  };

  const filteredClubs =
    currentCategory === "전체"
      ? clubs
      : clubs.filter((club) => club.category === currentCategory);

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 348, 0));
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => {
      const maxTranslateX = (filteredClubs.length - 4) * 348;
      return Math.min(prevSlide + 348, maxTranslateX);
    });
  };

  return (
    <div id="categoryDiv">
      <div id="categorySpan">
        <span>카테고리</span>
      </div>
      <div id="categoryA">
        {categoryList.map((category) => (
          <Link
            key={category}
            to="#"
            onClick={() => handleCategoryClick(category)}
            className={currentCategory === category ? "active" : ""}
          >
            {category}
          </Link>
        ))}
      </div>

      {filteredClubs.length > 0 ? (
        <>
          <div className="categoryDiv" ref={sliderContainerRef}>
            <div
              className="slide-container"
              style={{ transform: `translateX(-${currentSlide}px)` }}
            >
              {filteredClubs.map((club) => (
                <ClubItem
                  key={club.clubNo}
                  club={club}
                  backgroundColor={categoryColors[club.category] || "#ffffff"}
                />
              ))}
            </div>
          </div>

          <div className="categoryButtonContainer">
            {currentSlide > 0 && (
              <img
                src="/assets/images/left-arrow.png"
                alt="이전 버튼"
                className="categoryButtonL"
                onClick={handlePrevClick}
              />
            )}
            {currentSlide < (filteredClubs.length - 4) * 344 && (
              <img
                src="/assets/images/right-arrow.png"
                alt="다음 버튼"
                className="categoryButtonR"
                onClick={handleNextClick}
              />
            )}
          </div>
        </>
      ) : (
        <div>로딩 중...</div>
      )}
    </div>
  );
}

export default Category;