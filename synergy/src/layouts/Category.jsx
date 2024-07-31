import React, { useState, useEffect, useRef } from "react"; // useEffect 추가
import "/src/css/category.css";

function Category() {
  const [currentCategory, setCurrentCategory] = useState("스포츠"); // 초기값 "스포츠"로 설정
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const categoryData = {
    // 데이터 구조 변경: 이미지와 설명 함께 저장
    스포츠: [
      {
        image: "./src/images/sport1.jpg",
        title: "스터디 카페 정복",
        region: "서울 신촌",
        gender: "여",
        minAge: 21,
        maxAge: 33,
        type: "정기",
        categories: ["친목"],
        daysOfWeek: ["화", "목", "수"],
      },
      {
        image: "./src/images/sport2.jpg",
        title: "사진 출사 (초보 환영)",
        region: "서울 여의도",
        gender: "여",
        minAge: 25,
        maxAge: 36,
        type: "정기",
        categories: ["게임"],
        daysOfWeek: ["일", "월"],
      },
      {
        image: "./src/images/sport3.jpg",
        title: "보드게임 정복! (초보/숙련자 모두 환영)",
        region: "서울 이태원",
        gender: "여",
        minAge: 23,
        maxAge: 40,
        type: "비정기",
        categories: ["스포츠", "스터디", "맛집탐방"],
        daysOfWeek: ["목", "일"],
      },
      {
        image: "./src/images/slideImg1.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/slideImg2.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
    ],
    맛집탐방: [
      {
        image: "./src/images/food1.jpg",
        title: "봉사활동 같이 해요",
        region: "서울 홍대",
        gender: "남",
        minAge: 25,
        maxAge: 29,
        type: "비정기",
        categories: ["스터디", "맛집탐방", "친목"],
        daysOfWeek: ["금"],
      },
      {
        image: "./src/images/food2.jpg",
        title: "봉사활동 같이 해요",
        region: "서울 건대",
        gender: "무관",
        minAge: 30,
        maxAge: 33,
        type: "정기",
        categories: ["친목"],
        daysOfWeek: ["월", "화", "수"],
      },
      {
        image: "./src/images/food3.jpeg",
        title: "캘리그라피 배우기",
        region: "서울 홍대",
        gender: "무관",
        minAge: 29,
        maxAge: 39,
        type: "정기",
        categories: ["스터디", "취미"],
        daysOfWeek: ["금", "일", "수"],
      },
      {
        image: "./src/images/hobby3.jpg",
        title: "농구 팀원 모집",
        region: "서울 종로",
        gender: "무관",
        minAge: 26,
        maxAge: 37,
        type: "비정기",
        categories: ["게임", "운동"],
        daysOfWeek: ["일"],
      },
      {
        image: "./src/images/slideImg2.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
    ],
    독서: [
      {
        image: "./src/images/read3.jpeg",
        title: "사진 출사 (초보 환영)",
        region: "서울 강북",
        gender: "여",
        minAge: 26,
        maxAge: 38,
        type: "정기",
        categories: ["봉사", "운동"],
        daysOfWeek: ["수"],
      },
      {
        image: "./src/images/read4.jpg",
        title: "사진 출사 (초보 환영)",
        region: "서울 여의도",
        gender: "여",
        minAge: 25,
        maxAge: 36,
        type: "정기",
        categories: ["게임"],
        daysOfWeek: ["일", "월"],
      },
      {
        image: "./src/images/read5.jpg",
        title: "알고리즘 스터디",
        region: "서울 강남",
        gender: "무관",
        minAge: 23,
        maxAge: 35,
        type: "정기",
        categories: ["스터디", "개발"],
        daysOfWeek: ["화", "목"],
      },
      {
        image: "./src/images/read6.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/read7.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/read8.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
    ],
    친목: [
      {
        image: "./src/images/friend1.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/friend2.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/friend3.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/friend4.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/friend5.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/friend6.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
    ],
    전시: [
      {
        image: "./src/images/show1.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/show2.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/show3.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/show4.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/slideImg1.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/slideImg2.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
    ],
    취미활동: [
      {
        image: "./src/images/hobby1.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/hobby2.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/movie1.webp",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/movie2.webp",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/slideImg2.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
    ],
    스터디: [
      {
        image: "./src/images/study1.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/study2.jpeg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/study3.jpg",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/slideImg1.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
      {
        image: "./src/images/slideImg2.png",
        title: "러닝 크루 모집 (초보 환영)",
        region: "서울 마포",
        gender: "무관",
        minAge: 19,
        maxAge: 45,
        type: "비정기",
        categories: ["스포츠", "러닝"],
        daysOfWeek: ["토"],
      },
    ],
  };
  useEffect(() => {
    // useEffect 추가
    // 컴포넌트가 처음 마운트될 때 실행
    setCurrentCategory("스포츠");
  }, []);
  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setCurrentSlide(0); // 카테고리 변경 시 슬라이드 초기화
  };

  const handlePrevClick = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const handleNextClick = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const visibleImages = currentCategory
    ? categoryData[currentCategory].slice(
        currentSlide,
        currentSlide +
          (categoryData[currentCategory].length < 4
            ? categoryData[currentCategory].length
            : 4)
      )
    : [];

  return (
    <>
      <div id="categoryDiv">
        <div id="categorySpan">
          <span>카테고리</span>
        </div>
        <div id="categoryA">
          {Object.keys(categoryData).map((category) => (
            <a
              key={category}
              href="#"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </a>
          ))}
        </div>
        {currentCategory && (
          <div
            className="categoryDiv"
            ref={sliderRef}
            style={{ position: "relative" }}
          >
            {visibleImages.map((item, index) => (
              <div
                key={item.image}
                style={{
                  display: "flex",
                  flexDirection: "column", // flexDirection 변경: 세로 정렬
                  justifyContent: "space-between",
                  width:
                    categoryData[currentCategory].length > 1 ? "300px" : "100%",
                  marginBottom: "10px", // 이미지 간 간격 추가
                }}
              >
                <a href="">
                  <img
                    src={item.image}
                    alt={currentCategory}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      height: "150px",
                    }}
                  >
                    <span>{item.title}</span>
                    <br />
                    <span>카테고리: {item.categories.join(", ")}</span>
                    <br />
                    <span>지역: {item.region}</span>
                    <br />
                    <span>{item.type} 모임</span>
                    <br />
                    <span>성별: {item.gender}</span>
                    <br />
                    <span>최소 나이: {item.minAge}</span>
                    <br />
                    <span>요일: {item.daysOfWeek.join(", ")}</span>
                    <br />
                  </div>
                </a>
              </div>
            ))}

            {categoryData[currentCategory].length > 4 && (
              <>
                {currentSlide > 0 && (
                  <img
                    src="/src/images/left-arrow.png" // 이전 버튼 이미지 경로
                    alt="이전 버튼"
                    className="categoryButton"
                    onClick={handlePrevClick}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "-70px",
                      transform: "translateY(-50%)",
                      cursor: "pointer", // 이미지에 클릭 가능한 커서 스타일 추가
                    }}
                  />
                )}
                {currentSlide < categoryData[currentCategory].length - 4 && (
                  <img
                    src="/src/images/right-arrow.png" // 다음 버튼 이미지 경로
                    alt="다음 버튼"
                    className="categoryButton"
                    onClick={handleNextClick}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-70px",
                      transform: "translateY(-50%)",
                      cursor: "pointer", // 이미지에 클릭 가능한 커서 스타일 추가
                    }}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default Category;
