import React, { useState, useEffect } from "react";
import "/src/css/member/groups.css";
const images = [
  {
    src: "/src/assets/images/food1.jpg",
    alt: "Image 1",
    link: "/image1",
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
    src: "/src/assets/images/food2.jpg",
    alt: "Image 1",
    link: "/image1",
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
    src: "/src/assets/images/food3.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "독서 토론 모임 (소설)",
    region: "서울 종로",
    gender: "무관",
    minAge: 25,
    maxAge: 50,
    type: "정기",
    categories: "독서", // "소설" 제거
    daysOfWeek: ["일"],
  },
  {
    src: "/src/assets/images/friend1.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "힙스터 맛집 탐방!",
    region: "서울 용산",
    gender: "무관",
    minAge: 20,
    maxAge: 30,
    type: "비정기",
    categories: "맛집탐방", // "친목" 제거
    daysOfWeek: ["금", "토"],
  },
  {
    src: "/src/assets/images/friend2.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 홍대",
    gender: "무관",
    minAge: 18,
    maxAge: 35,
    type: "정기",
    categories: "취미", // "보드게임" 제거
    daysOfWeek: ["수", "토"],
  },
  {
    src: "/src/assets/images/friend3.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "영화 감상 모임",
    region: "서울 신촌",
    gender: "여",
    minAge: 25,
    maxAge: 31,
    type: "정기",
    categories: "문화", // "운동"을 "문화"로 변경 (영화 감상에 더 적합)
    daysOfWeek: ["월"],
  },
  {
    src: "/src/assets/images/friend4.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "요리 교실 (한식)",
    region: "서울 종로",
    gender: "남",
    minAge: 29,
    maxAge: 35,
    type: "비정기",
    categories: "취미", // "스포츠"를 "취미"로 변경 (요리에 더 적합)
    daysOfWeek: ["목"],
  },
  {
    src: "/src/assets/images/friend5.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "반려동물 산책 모임",
    region: "서울 여의도",
    gender: "남",
    minAge: 21,
    maxAge: 39,
    type: "비정기",
    categories: "친목", // "운동" 제거
    daysOfWeek: ["수"],
  },
  {
    src: "/src/assets/images/friend6.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 홍대",
    gender: "여",
    minAge: 25,
    maxAge: 33,
    type: "비정기",
    categories: "취미", // "예술", "친목" 제거
    daysOfWeek: ["토", "일"],
  },
  {
    src: "/src/assets/images/hobby1.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "스터디 카페 정복",
    region: "서울 건대",
    gender: "무관",
    minAge: 21,
    maxAge: 32,
    type: "정기",
    categories: "스터디",
    daysOfWeek: ["금", "토", "수"],
  },
  {
    src: "/src/assets/images/hobby2.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "베이킹 클래스",
    region: "서울 강북",
    gender: "무관",
    minAge: 26,
    maxAge: 32,
    type: "비정기",
    categories: "취미", // "예술" 제거
    daysOfWeek: ["월", "수"],
  },
  {
    src: "/src/assets/images/hobby3.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "스터디 카페 정복",
    region: "서울 강남",
    gender: "남",
    minAge: 21,
    maxAge: 37,
    type: "비정기",
    categories: "스터디", // "게임", "운동" 제거
    daysOfWeek: ["금", "화", "월"],
  },
  {
    src: "/src/assets/images/movie1.webp",
    alt: "Image 1",
    link: "/image1",
    title: "영화 감상 모임",
    region: "서울 건대",
    gender: "여",
    minAge: 28,
    maxAge: 29,
    type: "정기",
    categories: "문화", // "여행", "맛집탐방", "게임" 제거
    daysOfWeek: ["목"],
  },
  {
    src: "/src/assets/images/movie2.webp",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 용산",
    gender: "무관",
    minAge: 23,
    maxAge: 26,
    type: "정기",
    categories: "취미", // "독서"를 "취미"로 변경 (보드게임에 더 적합)
    daysOfWeek: ["토"],
  },
  {
    src: "/src/assets/images/read3.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 홍대",
    gender: "남",
    minAge: 20,
    maxAge: 30,
    type: "정기",
    categories: "봉사",
    daysOfWeek: ["목", "금"],
  },
  {
    src: "/src/assets/images/read4.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "축구/풋살 팀원 모집",
    region: "서울 용산",
    gender: "남",
    minAge: 20,
    maxAge: 36,
    type: "비정기",
    categories: "스포츠", // "게임", "친목" 제거
    daysOfWeek: ["일"],
  },
  {
    src: "/src/assets/images/read5.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "댄스 동아리",
    region: "서울 이태원",
    gender: "무관",
    minAge: 25,
    maxAge: 31,
    type: "비정기",
    categories: "취미", // "맛집탐방" 제거
    daysOfWeek: ["금", "목"],
  },
  {
    src: "/src/assets/images/read6.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "반려동물 산책 모임",
    region: "서울 이태원",
    gender: "여",
    minAge: 27,
    maxAge: 33,
    type: "정기",
    categories: "봉사",
    daysOfWeek: ["목", "수"],
  },
  {
    src: "/src/assets/images/read7.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "요리 교실 (한식)",
    region: "서울 강북",
    gender: "무관",
    minAge: 29,
    maxAge: 29,
    type: "정기",
    categories: "취미", // "스터디"를 "취미"로 변경 (요리에 더 적합)
    daysOfWeek: ["수", "일", "토"],
  },
  {
    src: "/src/assets/images/read8.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "외국어 스터디 (영어/일본어 등)",
    region: "서울 홍대",
    gender: "남",
    minAge: 26,
    maxAge: 35,
    type: "정기",
    categories: "스터디", // "스포츠", "예술" 제거
    daysOfWeek: ["수"],
  },
  {
    src: "/src/assets/images/show1.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 이태원",
    gender: "여",
    minAge: 29,
    maxAge: 34,
    type: "비정기",
    categories: "친목", // "맛집탐방", "운동" 제거
    daysOfWeek: ["일", "월", "수"],
  },
  {
    src: "/src/assets/images/show2.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "악기 연주 모임 (기타/피아노 등)",
    region: "서울 마포",
    gender: "무관",
    minAge: 20,
    maxAge: 29,
    type: "비정기",
    categories: "예술", // "스포츠", "봉사", "독서" 제거
    daysOfWeek: ["일", "월"],
  },
  {
    src: "/src/assets/images/show3.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 이태원",
    gender: "여",
    minAge: 23,
    maxAge: 40,
    type: "비정기",
    categories: "취미", // "스포츠", "스터디", "맛집탐방" 제거
    daysOfWeek: ["목", "일"],
  },
  {
    src: "/src/assets/images/show4.png",
    alt: "Image 1",
    link: "/image1",
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
    src: "/src/assets/images/sport1.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "봉사활동 같이 해요",
    region: "서울 건대",
    gender: "무관",
    minAge: 30,
    maxAge: 33,
    type: "정기",
    categories: "봉사", // "친목"을 "봉사"로 변경 (제목과 일치)
    daysOfWeek: ["월", "화", "수"],
  },
  {
    src: "/src/assets/images/sport2.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "캘리그라피 배우기",
    region: "서울 홍대",
    gender: "무관",
    minAge: 29,
    maxAge: 39,
    type: "정기",
    categories: "예술", // "스터디", "취미" 제거
    daysOfWeek: ["금", "일", "수"],
  },
  {
    src: "/src/assets/images/sport3.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "농구 팀원 모집",
    region: "서울 종로",
    gender: "무관",
    minAge: 26,
    maxAge: 37,
    type: "비정기",
    categories: "스포츠", // "게임", "운동" 제거
    daysOfWeek: ["일"],
  },
  {
    src: "/src/assets/images/study1.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "사진 출사 (초보 환영)",
    region: "서울 강북",
    gender: "여",
    minAge: 26,
    maxAge: 38,
    type: "정기",
    categories: "취미", // "봉사", "운동" 제거
    daysOfWeek: ["수"],
  },
  {
    src: "/src/assets/images/study2.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "사진 출사 (초보 환영)",
    region: "서울 여의도",
    gender: "여",
    minAge: 25,
    maxAge: 36,
    type: "정기",
    categories: "취미", // "게임" 제거
    daysOfWeek: ["일", "월"],
  },
  {
    src: "/src/assets/images/study3.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "스터디 카페 정복",
    region: "서울 신촌",
    gender: "여",
    minAge: 21,
    maxAge: 33,
    type: "정기",
    categories: "스터디",
    daysOfWeek: ["화", "목", "수"],
  },
];

function Groups() {
  const [imageRows, setImageRows] = useState([]);

  useEffect(() => {
    const rows = [];
    let currentRow = [];
    for (let i = 0; i < images.length; i++) {
      // 12번째 이미지부터 반복
      currentRow.push(images[i]);
      if (currentRow.length === 4 || i === images.length - 1) {
        rows.push(currentRow);
        currentRow = [];
      }
    }
    setImageRows(rows);
  }, [images]);

  return (
    <>
      <div id="groupDiv">
        <div className="groupDiv">
          <span>핫한 소셜 클럽! 오늘 뭐해?</span>
        </div>
        <div className="groupType">
          {/* 하드 코딩된 데이터 대신 실제 데이터 사용 */}
          {images.slice(0, 4).map((image, index) => (
            <a key={index} href={image.link}>
              <img src={image.src} alt={image.alt} />
              <div>
                <span>{image.title}</span>
                <span>카테고리: {image.categories}</span>{" "}
                {/* categories 배열이 아닌 문자열로 수정 */}
                <span>지역: {image.region}</span>
                <span>{image.type} 모임</span>
                <span>성별: {image.gender}</span>
                <span>최소 나이: {image.minAge}</span>
                <span>요일: {image.daysOfWeek.join(", ")}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="groupDiv">
          <span>망설이면 마감! 지금 바로 신청하세요!</span>
        </div>
        <div className="groupType">
          {/* 하드 코딩된 데이터 및 잘못된 참조 수정 */}
          {images.slice(4, 8).map((image, index) => (
            <a key={index} href={image.link}>
              <img src={image.src} alt={image.alt} />
              <div>
                <span>{image.title}</span>
                <span>카테고리: {image.categories}</span>
                <span>지역: {image.region}</span>
                <span>{image.type} 모임</span>
                <span>성별: {image.gender}</span>
                <span>최소 나이: {image.minAge}</span>
                <span>요일: {image.daysOfWeek.join(", ")}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="groupDiv">
          <span>우리 동네, 우리들의 이야기</span>
        </div>
        <div className="groupType">
          {/* 하드 코딩된 데이터 및 잘못된 참조 수정 */}
          {images.slice(8, 12).map((image, index) => (
            <a key={index} href={image.link}>
              <img src={image.src} alt={image.alt} />
              <div>
                <span>{image.title}</span>
                <span>카테고리: {image.categories}</span>
                <span>지역: {image.region}</span>
                <span>{image.type} 모임</span>
                <span>성별: {image.gender}</span>
                <span>최소 나이: {image.minAge}</span>
                <span>요일: {image.daysOfWeek.join(", ")}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="groupDiv">
          <span>모임 목록</span>
        </div>
        <div>
          {imageRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "13px",
                marginBottom: "70px",
              }}
            >
              {row.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  style={{ width: "calc(25% - 10px)" }}
                  className="groupType"
                >
                  <div>
                    <a href={image.link}>
                      <img src={image.src} alt={image.alt} />
                      <div>
                        <span>{image.title}</span>
                        <span>카테고리: {image.categories}</span>
                        <span>지역: {image.region}</span>
                        <span>{image.type} 모임</span>
                        <span>성별: {image.gender}</span>
                        <span>최소 나이: {image.minAge}</span>
                        <span>요일: {image.daysOfWeek.join(", ")}</span>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Groups;
