import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 import
import "/src/css/searchresult.css";
const areaData = [
  {
    city: "서울",
    data: [
      "전체",
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
  },
  {
    city: "부산광역시",
    data: [
      "전체",
      "강서구",
      "금정구",
      "기장군",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
    ],
  },
  {
    city: "대구광역시",
    data: [
      "전체",
      "남구",
      "달서구",
      "달성군",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
    ],
  },
  {
    city: "인천광역시",
    data: [
      "전체",
      "강화군",
      "계양구",
      "남동구",
      "동구",
      "미추홀구",
      "부평구",
      "서구",
      "연수구",
      "웅진군",
      "중구",
    ],
  },
  {
    city: "광주광역시",
    data: ["전체", "광산구", "남구", "동구", "북구", "서구"],
  },
  {
    city: "대전광역시",
    data: ["전체", "대덕구", "동구", "서구", "유성구", "중구"],
  },
  {
    city: "울산광역시",
    data: ["전체", "남구", "동구", "북구", "을주군", "중구"],
  },
  {
    city: "경기도",
    data: [
      "전체",
      "가평군",
      "고양시",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "양주시",
      "양평군",
      "여주시",
      "연천군",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
    ],
  },
  {
    city: "강원도",
    data: [
      "전체",
      "강릉시",
      "고성군",
      "동해시",
      "삼척시",
      "속초시",
      "양구군",
      "양양군",
      "영월군",
      "원주시",
      "인제군",
      "정선군",
      "철원군",
      "춘천시",
      "태백시",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
  },
  {
    city: "충청북도",
    data: [
      "전체",
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "제천시",
      "증평군",
      "진천군",
      "청주시",
      "충주시",
    ],
  },
  {
    city: "충청남도",
    data: [
      "전체",
      "계룡시",
      "공주시",
      "금산군",
      "논산시",
      "당진시",
      "보령시",
      "보령시",
      "부여군",
      "서산시",
      "서천군",
      "아산시",
      "예산군",
      "천안시",
      "청양군",
      "태안군",
      "홍성군",
    ],
  },
  {
    city: "경상북도",
    data: [
      "전체",
      "경산시",
      "경주시",
      "고령군",
      "구미시",
      "군위군",
      "김천시",
      "문경시",
      "봉화군",
      "상주시",
      "상주군",
      "안동시",
      "영덕군",
      "영양군",
      "영주시",
      "영천시",
      "예천군",
      "울릉군",
      "을진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
      "포항시",
    ],
  },
  {
    city: "경상남도",
    data: [
      "전체",
      "거제시",
      "거창군",
      "고성군",
      "김해시",
      "남해군",
      "밀양시",
      "사천시",
      "산청군",
      "양산시",
      "의령군",
      "진주시",
      "창녕군",
      "창원시",
      "통영시",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
  },
  {
    city: "전라북도",
    data: [
      "전체",
      "고창군",
      "군산시",
      "김제시",
      "남원시",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "익산시",
      "임실군",
      "장수군",
      "전주시",
      "정읍시",
      "진안군",
    ],
  },
  {
    city: "전라남도",
    data: [
      "전체",
      "강진군",
      "고흥군",
      "곡성군",
      "광양시",
      "구례군",
      "나주시",
      "담양군",
      "목포시",
      "무안군",
      "보성군",
      "순천시",
      "신안군",
      "여수시",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
  },
  {
    city: "제주특별자치도",
    data: ["전체", "서귀포시", "제주시"],
  },
];
const images = [
  {
    src: "./src/images/food1.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "알고리즘 스터디",
    region: "서울 강남구",
    gender: "무관",
    minAge: 23,
    type: "정기",
    categories: ["스터디", "개발"],
    daysOfWeek: ["화", "목"],
  },
  {
    src: "./src/images/food2.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "러닝 크루 모집 (초보 환영)",
    region: "서울 마포구",
    gender: "무관",
    minAge: 19,
    type: "비정기",
    categories: ["스포츠", "러닝"],
    daysOfWeek: ["토"],
  },
  {
    src: "./src/images/food3.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "독서 토론 모임 (소설)",
    region: "서울 종로구",
    gender: "무관",
    minAge: 25,
    type: "정기",
    categories: ["독서", "소설"],
    daysOfWeek: ["일"],
  },
  {
    src: "./src/images/friend1.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "힙스터 맛집 탐방!",
    region: "서울 용산구",
    gender: "무관",
    minAge: 20,
    type: "비정기",
    categories: ["맛집탐방", "친목"],
    daysOfWeek: ["금", "토"],
  },
  {
    src: "./src/images/friend2.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 마포구",
    gender: "무관",
    minAge: 18,
    type: "정기",
    categories: ["취미", "보드게임"],
    daysOfWeek: ["수", "토"],
  },
  {
    src: "./src/images/friend3.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "영화 감상 모임",
    region: "서울 서대문구",
    gender: "여",
    minAge: 25,
    type: "정기",
    categories: ["운동"],
    daysOfWeek: ["월"],
  },
  {
    src: "./src/images/friend4.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "요리 교실 (한식)",
    region: "서울 종로구",
    gender: "남",
    minAge: 29,
    type: "비정기",
    categories: ["스포츠"],
    daysOfWeek: ["목"],
  },
  {
    src: "./src/images/friend5.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "반려동물 산책 모임",
    region: "서울 영등포구",
    gender: "남",
    minAge: 21,
    type: "비정기",
    categories: ["친목", "운동"],
    daysOfWeek: ["수"],
  },
  {
    src: "./src/images/friend6.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 마포구",
    gender: "여",
    minAge: 25,
    type: "비정기",
    categories: ["예술", "친목", "취미"],
    daysOfWeek: ["토", "일"],
  },
  {
    src: "./src/images/hobby1.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "스터디 카페 정복",
    region: "서울 광진구",
    gender: "무관",
    minAge: 21,
    type: "정기",
    categories: ["독서"],
    daysOfWeek: ["금", "토", "수"],
  },
  {
    src: "./src/images/hobby2.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "베이킹 클래스",
    region: "서울 강북구",
    gender: "무관",
    minAge: 26,
    type: "비정기",
    categories: ["예술", "취미"],
    daysOfWeek: ["월", "수"],
  },
  {
    src: "./src/images/hobby3.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "스터디 카페 정복",
    region: "서울 강남구",
    gender: "남",
    minAge: 21,
    type: "비정기",
    categories: ["독서", "게임", "운동"],
    daysOfWeek: ["금", "화", "월"],
  },
  {
    src: "./src/images/movie1.webp",
    alt: "Image 1",
    link: "/image1",
    title: "영화 감상 모임",
    region: "서울 광진구",
    gender: "여",
    minAge: 28,
    type: "정기",
    categories: ["여행", "맛집탐방", "게임"],
    daysOfWeek: ["목"],
  },
  {
    src: "./src/images/movie2.webp",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 용산구",
    gender: "무관",
    minAge: 23,
    type: "정기",
    categories: ["독서"],
    daysOfWeek: ["토"],
  },
  {
    src: "./src/images/read3.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 마포구",
    gender: "남",
    minAge: 20,
    type: "정기",
    categories: ["봉사"],
    daysOfWeek: ["목", "금"],
  },
  {
    src: "./src/images/read4.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "축구/풋살 팀원 모집",
    region: "서울 용산구",
    gender: "남",
    minAge: 20,
    type: "비정기",
    categories: ["게임", "친목"],
    daysOfWeek: ["일"],
  },
  {
    src: "./src/images/read5.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "댄스 동아리",
    region: "서울 용산구",
    gender: "무관",
    minAge: 25,
    type: "비정기",
    categories: ["취미", "맛집탐방"],
    daysOfWeek: ["금", "목"],
  },
  {
    src: "./src/images/read6.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "반려동물 산책 모임",
    region: "서울 용산구",
    gender: "여",
    minAge: 27,
    type: "정기",
    categories: ["봉사"],
    daysOfWeek: ["목", "수"],
  },
  {
    src: "./src/images/read7.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "요리 교실 (한식)",
    region: "서울 강북구",
    gender: "무관",
    minAge: 29,
    type: "정기",
    categories: ["스터디"],
    daysOfWeek: ["수", "일", "토"],
  },
  {
    src: "./src/images/read8.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "외국어 스터디 (영어/일본어 등)",
    region: "서울 마포구",
    gender: "남",
    minAge: 26,
    type: "정기",
    categories: ["스포츠", "예술"],
    daysOfWeek: ["수"],
  },
  {
    src: "./src/images/show1.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 용산구",
    gender: "여",
    minAge: 29,
    type: "비정기",
    categories: ["친목", "맛집탐방", "운동"],
    daysOfWeek: ["일", "월", "수"],
  },
  {
    src: "./src/images/show2.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "악기 연주 모임 (기타/피아노 등)",
    region: "서울 마포구",
    gender: "무관",
    minAge: 20,
    type: "비정기",
    categories: ["스포츠", "봉사", "독서"],
    daysOfWeek: ["일", "월"],
  },
  {
    src: "./src/images/show3.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "보드게임 정복! (초보/숙련자 모두 환영)",
    region: "서울 용산구",
    gender: "여",
    minAge: 23,
    type: "비정기",
    categories: ["스포츠", "스터디", "맛집탐방"],
    daysOfWeek: ["목", "일"],
  },
  {
    src: "./src/images/show4.png",
    alt: "Image 1",
    link: "/image1",
    title: "봉사활동 같이 해요",
    region: "서울 마포구",
    gender: "남",
    minAge: 25,
    type: "비정기",
    categories: ["스터디", "맛집탐방", "친목"],
    daysOfWeek: ["금"],
  },
  {
    src: "./src/images/sport1.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "봉사활동 같이 해요",
    region: "서울 광진구",
    gender: "무관",
    minAge: 30,
    type: "정기",
    categories: ["친목"],
    daysOfWeek: ["월", "화", "수"],
  },
  {
    src: "./src/images/sport2.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "캘리그라피 배우기",
    region: "서울 마포구",
    gender: "무관",
    minAge: 29,
    type: "정기",
    categories: ["스터디", "취미"],
    daysOfWeek: ["금", "일", "수"],
  },
  {
    src: "./src/images/sport3.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "농구 팀원 모집",
    region: "서울 종로구",
    gender: "무관",
    minAge: 26,
    type: "비정기",
    categories: ["게임", "운동"],
    daysOfWeek: ["일"],
  },
  {
    src: "./src/images/study1.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "사진 출사 (초보 환영)",
    region: "서울 강북구",
    gender: "여",
    minAge: 26,
    type: "정기",
    categories: ["봉사", "운동"],
    daysOfWeek: ["수"],
  },
  {
    src: "./src/images/study2.jpeg",
    alt: "Image 1",
    link: "/image1",
    title: "사진 출사 (초보 환영)",
    region: "서울 영등포구",
    gender: "여",
    minAge: 25,
    type: "정기",
    categories: ["게임"],
    daysOfWeek: ["일", "월"],
  },
  {
    src: "./src/images/study3.jpg",
    alt: "Image 1",
    link: "/image1",
    title: "스터디 카페 정복",
    region: "서울 서대문구",
    gender: "여",
    minAge: 21,
    type: "정기",
    categories: ["친목"],
    daysOfWeek: ["화", "목", "수"],
  },
];

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    minAge: "",
    type: "",
    categories: [],
    daysOfWeek: [],
  });
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    setSelectedData(""); // 도시 변경 시 데이터 선택 초기화
  };

  const handleDataChange = (event) => {
    setSelectedData(event.target.value);
  };

  const handleApplyFilter = () => {
    setApplyFilter(true);
  };

  const filteredResults = applyFilter
    ? images.filter((result) => {
        const matchesSearchTerm = result.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesRegion =
          !filters.region || result.region === filters.region;
        const matchesGender =
          !filters.gender || result.gender === filters.gender;
        const matchesAge = !filters.minAge || result.minAge >= filters.minAge;
        const matchesType = !filters.type || result.type === filters.type;
        const matchesCategories =
          filters.categories.length === 0 ||
          filters.categories.some((cat) => result.categories.includes(cat));
        const matchesDaysOfWeek =
          filters.daysOfWeek.length === 0 ||
          filters.daysOfWeek.some((day) => result.daysOfWeek.includes(day));
        const matchesCityAndData =
          (selectedCity === "" && selectedData === "") ||
          (selectedCity !== "" &&
            result.region.startsWith(selectedCity) &&
            (selectedData === "전체" || result.region.endsWith(selectedData)));

        return (
          matchesSearchTerm &&
          matchesRegion &&
          matchesGender &&
          matchesAge &&
          matchesType &&
          matchesCategories &&
          matchesDaysOfWeek &&
          matchesCityAndData
        );
      })
    : images;

  return (
    <section className="search-page">
      <div className="filter-section">
        <div className="filter-header">
          <h3 className="filter-title">상세 조회</h3>
        </div>
        <div className="filter-body">
          <div className="filter-row">
            <label htmlFor="word">모임명 검색:</label>
            <input
              id="word"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="모임명을 입력하세요"
            />
          </div>
          <div className="filter-row">
            <label htmlFor="city">도시:</label>
            <select id="city" value={selectedCity} onChange={handleCityChange}>
              <option value="">전체</option>
              {areaData.map((area) => (
                <option key={area.city} value={area.city}>
                  {area.city}
                </option>
              ))}
            </select>
            <label htmlFor="data">상세 지역:</label>
            <select id="data" value={selectedData} onChange={handleDataChange}>
              <option value="">전체</option>
              {areaData
                .find((area) => area.city === selectedCity)
                ?.data.map((dataItem) => (
                  <option key={dataItem} value={dataItem}>
                    {dataItem}
                  </option>
                ))}
            </select>
          </div>

          <div className="filter-row">
            <label htmlFor="gender">성별:</label>
            <select
              id="gender"
              value={filters.gender}
              onChange={(e) => handleFilterChange("gender", e.target.value)}
            >
              <option value="">무관</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
          </div>
          <div className="filter-row">
            <label htmlFor="minAge">나이:</label>
            <input
              type="number"
              id="minAge"
              value={filters.minAge}
              onChange={(e) => {
                const newMinAge = parseInt(e.target.value, 10);
                handleFilterChange(
                  "minAge",
                  isNaN(newMinAge) || newMinAge < 0 ? 0 : newMinAge
                );
              }}
              placeholder="최소 나이"
              min="0" // 최소값 설정 추가
            />
          </div>
          <div className="filter-row">
            <label htmlFor="type">모임 유형:</label>
            <select
              id="type"
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
            >
              <option value="">전체</option>
              <option value="정기">정기</option>
              <option value="일회성">일회성</option>
            </select>
          </div>
          <div className="filter-row">
            <label>카테고리:</label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("스터디")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("스터디")
                      ? filters.categories.filter((cat) => cat !== "스터디")
                      : [...filters.categories, "스터디"]
                  )
                }
              />{" "}
              스터디
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("독서")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("독서")
                      ? filters.categories.filter((cat) => cat !== "독서")
                      : [...filters.categories, "독서"]
                  )
                }
              />{" "}
              독서
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("스포츠")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("스포츠")
                      ? filters.categories.filter((cat) => cat !== "스포츠")
                      : [...filters.categories, "스포츠"]
                  )
                }
              />{" "}
              스포츠{" "}
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("맛집탐방")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("맛집탐방")
                      ? filters.categories.filter((cat) => cat !== "맛집탐방")
                      : [...filters.categories, "맛집탐방"]
                  )
                }
              />{" "}
              맛집탐방
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("취미")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("취미")
                      ? filters.categories.filter((cat) => cat !== "취미")
                      : [...filters.categories, "취미"]
                  )
                }
              />{" "}
              취미
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("친목")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("친목")
                      ? filters.categories.filter((cat) => cat !== "친목")
                      : [...filters.categories, "친목"]
                  )
                }
              />{" "}
              친목
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("전시")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("전시")
                      ? filters.categories.filter((cat) => cat !== "전시")
                      : [...filters.categories, "전시"]
                  )
                }
              />{" "}
              전시
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("예술")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("예술")
                      ? filters.categories.filter((cat) => cat !== "예술")
                      : [...filters.categories, "예술"]
                  )
                }
              />{" "}
              예술
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("봉사")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("봉사")
                      ? filters.categories.filter((cat) => cat !== "봉사")
                      : [...filters.categories, "봉사"]
                  )
                }
              />{" "}
              봉사
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("운동")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("운동")
                      ? filters.categories.filter((cat) => cat !== "운동")
                      : [...filters.categories, "운동"]
                  )
                }
              />{" "}
              운동
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("게임")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("게임")
                      ? filters.categories.filter((cat) => cat !== "게임")
                      : [...filters.categories, "게임"]
                  )
                }
              />{" "}
              게임
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("여행")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("여행")
                      ? filters.categories.filter((cat) => cat !== "여행")
                      : [...filters.categories, "여행"]
                  )
                }
              />{" "}
              여행
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("개발")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("개발")
                      ? filters.categories.filter((cat) => cat !== "개발")
                      : [...filters.categories, "개발"]
                  )
                }
              />{" "}
              개발
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.categories.includes("러닝")}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes("러닝")
                      ? filters.categories.filter((cat) => cat !== "러닝")
                      : [...filters.categories, "러닝"]
                  )
                }
              />{" "}
              러닝
            </label>
          </div>
          <div className="filter-row">
            <label>요일:</label>
            <label>
              <input
                type="checkbox"
                checked={filters.daysOfWeek.includes("월")}
                onChange={() =>
                  handleFilterChange(
                    "daysOfWeek",
                    filters.daysOfWeek.includes("월")
                      ? filters.daysOfWeek.filter((day) => day !== "월")
                      : [...filters.daysOfWeek, "월"]
                  )
                }
              />{" "}
              월
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.daysOfWeek.includes("화")}
                onChange={() =>
                  handleFilterChange(
                    "daysOfWeek",
                    filters.daysOfWeek.includes("화")
                      ? filters.daysOfWeek.filter((day) => day !== "화")
                      : [...filters.daysOfWeek, "화"]
                  )
                }
              />{" "}
              화
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.daysOfWeek.includes("수")}
                onChange={() =>
                  handleFilterChange(
                    "daysOfWeek",
                    filters.daysOfWeek.includes("수")
                      ? filters.daysOfWeek.filter((day) => day !== "수")
                      : [...filters.daysOfWeek, "수"]
                  )
                }
              />{" "}
              수
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.daysOfWeek.includes("목")}
                onChange={() =>
                  handleFilterChange(
                    "daysOfWeek",
                    filters.daysOfWeek.includes("목")
                      ? filters.daysOfWeek.filter((day) => day !== "목")
                      : [...filters.daysOfWeek, "목"]
                  )
                }
              />{" "}
              목
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.daysOfWeek.includes("금")}
                onChange={() =>
                  handleFilterChange(
                    "daysOfWeek",
                    filters.daysOfWeek.includes("금")
                      ? filters.daysOfWeek.filter((day) => day !== "금")
                      : [...filters.daysOfWeek, "금"]
                  )
                }
              />{" "}
              금
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.daysOfWeek.includes("토")}
                onChange={() =>
                  handleFilterChange(
                    "daysOfWeek",
                    filters.daysOfWeek.includes("토")
                      ? filters.daysOfWeek.filter((day) => day !== "토")
                      : [...filters.daysOfWeek, "토"]
                  )
                }
              />{" "}
              토
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.daysOfWeek.includes("일")}
                onChange={() =>
                  handleFilterChange(
                    "daysOfWeek",
                    filters.daysOfWeek.includes("일")
                      ? filters.daysOfWeek.filter((day) => day !== "일")
                      : [...filters.daysOfWeek, "일"]
                  )
                }
              />{" "}
              일
            </label>
          </div>
        </div>
        <div className="filter-footer">
          <button id="filterButton" onClick={handleApplyFilter}>
            필터 적용
          </button>
          <button
            onClick={() =>
              setFilters({
                region: "",
                gender: "",
                minAge: "",
                type: "",
                categories: [],
                daysOfWeek: [],
              })
            }
          >
            Reset
          </button>
        </div>
      </div>

      <div className="search-results">
        <span className="result-list-title">모임 목록</span>

        <ul>
          {filteredResults.map((result) => (
            <li key={result.title} className="search-result-item">
              <Link to={result.link}>
                <img src={result.src} alt={result.alt} />
              </Link>
              <div>
                <h4>{result.title}</h4>
                <p>{result.region}</p>
                <p>{result.gender}</p>
                <p>{result.minAge}세 이상</p>
                <p>{result.type}</p>
                <p>{result.categories.join(", ")}</p>
                <p>{result.daysOfWeek.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SearchPage;
