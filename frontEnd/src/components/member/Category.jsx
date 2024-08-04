import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "/src/css/member/category.css";

function Category() {
  const [currentCategory, setCurrentCategory] = useState("스포츠");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderContainerRef = useRef(null);

  const categoryData = {
    // 데이터 구조 변경: 이미지와 설명 함께 저장
    스포츠: [
      {
        image: "/src/assets/images/sport1.jpg",
        title: "스터디 카페 정복",
        region: "서울 신촌",
        gender: "여",
        minAge: 21,
        maxAge: 33,
        type: "정기",
        categories: "친목",
        daysOfWeek: ["화", "목", "수"],
      },
      {
        image: "/src/assets/images/sport2.jpg",
        title: "사진 출사 (초보 환영)",
        region: "서울 여의도",
        gender: "여",
        minAge: 25,
        maxAge: 36,
        type: "정기",
        categories: "게임",
        daysOfWeek: ["일", "월"],
      },
      {
        image: "/src/assets/images/sport3.jpg",
        title: "보드게임 정복! (초보/숙련자 모두 환영)",
        region: "서울 이태원",
        gender: "여",
        minAge: 23,
        maxAge: 40,
        type: "비정기",
        categories: "스포츠", // "스터디", "맛집탐방" 제거
        daysOfWeek: ["목", "일"],
      },
      {
        image: "/src/assets/images/slideImg1.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스포츠", // "러닝" 제거
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/slideImg2.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스포츠",
        daysOfWeek: ["토"],
      },
    ],
    맛집탐방: [
      {
        image: "/src/assets/images/food1.jpg",
        title: "봉사활동 같이 해요",
        region: "서울 홍대",
        gender: "남",
        minAge: 25,
        maxAge: 29,
        type: "비정기",
        categories: "봉사", // "스터디", "맛집탐방", "친목" 제거
        daysOfWeek: ["금"],
      },
      {
        image: "/src/assets/images/food2.jpg",
        title: "봉사활동 같이 해요",
        region: "서울 건대",
        gender: "무관",
        minAge: 30,
        maxAge: 33,
        type: "정기",
        categories: "친목",
        daysOfWeek: ["월", "화", "수"],
      },
      {
        image: "/src/assets/images/food3.jpeg",
        title: "캘리그라피 배우기",
        region: "서울 홍대",
        gender: "무관",
        minAge: 29,
        maxAge: 39,
        type: "정기",
        categories: "취미", // "스터디" 제거
        daysOfWeek: ["금", "일", "수"],
      },
      {
        image: "/src/assets/images/hobby3.jpg",
        title: "농구 팀원 모집",
        region: "서울 종로",
        gender: "무관",
        minAge: 26,
        maxAge: 37,
        type: "비정기",
        categories: "운동", // "게임" 제거
        daysOfWeek: ["일"],
      },
      {
        image: "/src/assets/images/slideImg2.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스포츠", // "러닝" 제거
        daysOfWeek: ["토"],
      },
    ],
    독서: [
      {
        image: "/src/assets/images/read3.jpeg",
        title: "사진 출사 (초보 환영)",
        region: "서울 강북",
        gender: "여",
        minAge: 26,
        maxAge: 38,
        type: "정기",
        categories: "봉사", // "운동" 제거
        daysOfWeek: ["수"],
      },
      {
        image: "/src/assets/images/read4.jpg",
        title: "사진 출사 (초보 환영)",
        region: "서울 여의도",
        gender: "여",
        minAge: 25,
        maxAge: 36,
        type: "정기",
        categories: "게임",
        daysOfWeek: ["일", "월"],
      },
      {
        image: "/src/assets/images/read5.jpg",
        title: "알고리즘 스터디",
        region: "서울 강남",
        gender: "무관",
        minAge: 23,
        maxAge: 35,
        type: "정기",
        categories: "스터디", // "개발" 제거
        daysOfWeek: ["화", "목"],
      },
      {
        image: "/src/assets/images/read6.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스포츠", // "러닝" 제거
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/read7.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스포츠",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/read8.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스포츠",
        daysOfWeek: ["토"],
      },
    ],
    친목: [
      {
        image: "/src/assets/images/friend1.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스포츠",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/friend2.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스포츠",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/friend3.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "친목",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/friend4.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "친목",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/friend5.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "친목",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/friend6.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "친목",
        daysOfWeek: ["토"],
      },
    ],
    전시: [
      {
        image: "/src/assets/images/show1.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "전시",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/show2.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "전시",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/show3.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "전시",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/show4.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "전시",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/slideImg1.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "전시",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/slideImg2.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "전시",
        daysOfWeek: ["토"],
      },
    ],
    취미활동: [
      {
        image: "/src/assets/images/hobby1.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "취미활동",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/hobby2.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "취미활동",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/movie1.webp",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "취미활동",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/movie2.webp",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "취미활동",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/slideImg2.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "취미활동",
        daysOfWeek: ["토"],
      },
    ],
    스터디: [
      {
        image: "/src/assets/images/study1.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스터디",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/study2.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스터디",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/study3.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스터디",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/slideImg1.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스터디",
        daysOfWeek: ["토"],
      },
      {
        image: "/src/assets/images/slideImg2.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: "스터디",
        daysOfWeek: ["토"],
      },
    ],
  };

  const sportsLinkRef = useRef(null);

  useEffect(() => {
    setCurrentCategory("스포츠");

    if (sportsLinkRef.current) {
      sportsLinkRef.current.focus();
    }
  }, []);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setCurrentSlide(0);
  };

  const handlePrevClick = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0)); // prev - 1과 0 중 더 큰 값을 반환
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) =>
      Math.min(prev + 1, categoryData[currentCategory].length - 4)
    );
  };

  const categoryColors = {
    스포츠: "#e7f4ff", // 연한 파란색 계열
    맛집탐방: "#f4f4ff", // 연한 파란색 계열
    독서: "#fff4f4", // 연한 핑크색 계열
    친목: "#fff4ff", // 연한 핑크색 계열
    전시: "#f4ffff", // 연한 하늘색 계열
    취미활동: "rgb(241, 250, 241)", // 연한 연두색
    스터디: "#fff4e6", // 연한 노란색
  };

  return (
    <div id="categoryDiv">
      <div id="categorySpan">
        <span>카테고리</span>
      </div>
      <div id="categoryA">
        {/* 카테고리 링크 */}
        {Object.keys(categoryData).map((category) => (
          <Link
            key={category}
            to="#"
            onClick={() => handleCategoryClick(category)}
            ref={category === "스포츠" ? sportsLinkRef : null}
          >
            {category}
          </Link>
        ))}
      </div>

      {currentCategory && (
        <>
          <div className="categoryDiv" ref={sliderContainerRef}>
            <div
              className="slide-container"
              style={{ transform: `translateX(-${currentSlide * 26}%)` }}
            >
              {categoryData[currentCategory].map((item) => (
                <div key={item.id} className="slide-item">
                  <Link to={`/details/${item.id}`}>
                    <img
                      className="categoryImg"
                      src={item.image}
                      alt={currentCategory}
                    />
                    <div
                      style={{
                        backgroundColor: categoryColors[currentCategory],
                      }}
                    >
                      {/* 배경색 설정 */}
                      <span>{item.title}</span>
                      <span>카테고리: {item.categories}</span>
                      <span>지역: {item.region}</span>
                      <span>{item.type} 모임</span>
                      <span>성별: {item.gender}</span>
                      <span>최소 나이: {item.minAge}</span>
                      <span>요일: {item.daysOfWeek.join(", ")}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="categoryButtonContainer">
            {currentSlide > 0 && (
              <img
                src="/src/assets/images/left-arrow.png"
                alt="이전 버튼"
                className="categoryButtonL"
                onClick={handlePrevClick}
              />
            )}
            {currentSlide < categoryData[currentCategory].length - 4 && (
              <img
                src="/src/assets/images/right-arrow.png"
                alt="다음 버튼"
                className="categoryButtonR"
                onClick={handleNextClick}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Category;
