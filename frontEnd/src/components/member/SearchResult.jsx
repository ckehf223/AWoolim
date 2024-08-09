import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "/src/css/member/searchresult.css";
import ClubItem from "./ClubItem";

const areaData = [
  {
    city: "서울시",
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

function SearchPage() {
  const location = useLocation();
  const initialSearchTerm = location.state?.searchTerm || "";

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filters, setFilters] = useState({
    city: "",
    district: "",
    gender: "",
    minAge: "",
    type: "",
    categories: [],
    daysOfWeek: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]); // 상태로 정의

  let latestFilters = useRef(filters); // 최신 필터 값 저장

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/clubs/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            searchTerm,
            filters: latestFilters.current,
          }),
        });
        const data = await response.json();
        if (isMounted) {
          setClubs(data);
          const categoriesSet = new Set(data.map((club) => club.category));
          setUniqueCategories(Array.from(categoriesSet));
          setFilteredResults(data); // 기본적으로 모든 클럽을 보여줍니다.
        }
      } catch (error) {
        console.error("클럽 데이터 가져오기 오류:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData(); // 컴포넌트 마운트 시 또는 검색어 변경 시 데이터 가져오기

    return () => {
      isMounted = false;
    };
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (name, value) => {
    latestFilters.current = { ...latestFilters.current, [name]: value };
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setSelectedCity(value);
    setSelectedDistrict("");
    handleFilterChange("city", value);
  };

  const handleDistrictChange = (event) => {
    const value = event.target.value;
    setSelectedDistrict(value);
    handleFilterChange("district", value);
  };

  const handleApplyFilter = () => {
    setShowFilterSection(!showFilterSection);
  };

  const handleFilterSubmit = () => {
    const results = applyFiltersToClubs(
      clubs,
      searchTerm,
      latestFilters.current
    );
    setFilteredResults(results); // 상태 업데이트
  };

  // 필터링 로직을 별도의 함수로 분리
  const applyFiltersToClubs = (clubsData, searchTerm, filters) => {
    return clubsData.filter((club) => {
      const searchTerms = searchTerm.toLowerCase().split(" ");
      const titleWords = club.clubTitle.toLowerCase().split(" ");

      const matchesSearchTerm =
        searchTerm === "" ||
        searchTerms.every((term) =>
          titleWords.some((word) => word.includes(term))
        );

      const matchesCity = filters.city === "" || club.city === filters.city;
      const matchesDistrict =
        filters.district === "" || club.district === filters.district;

      const matchesRegion = matchesCity && matchesDistrict;

      const matchesGender =
        filters.gender === "" || club.clubGender === filters.gender;

      const matchesMinAge =
        filters.minAge === "" ||
        club.clubMinAge >= parseInt(filters.minAge, 10);

      const matchesType =
        filters.type === "" || club.clubType === parseInt(filters.type, 10);

      const matchesCategories =
        filters.categories.length === 0 ||
        filters.categories.some((category) => club.category === category);

      const matchesDaysOfWeek =
        filters.daysOfWeek.length === 0 ||
        filters.daysOfWeek.some((day) => club.activityDays.includes(day));

      return (
        matchesSearchTerm &&
        matchesRegion &&
        matchesGender &&
        matchesMinAge &&
        matchesType &&
        matchesCategories &&
        matchesDaysOfWeek
      );
    });
  };

  // 기본 클럽 목록을 filteredResults로 설정
  useEffect(() => {
    setFilteredResults(clubs);
  }, [clubs]);

  return (
    <section className="search-page">
      <div className="search-header">
        <h3>검색 및 필터</h3>
        <button id="filterButton" onClick={handleApplyFilter}>
          {showFilterSection ? "필터 사용 중" : "필터 사용"}
        </button>
      </div>

      {showFilterSection && (
        <div className="filter-section">
          <div className="filter-header">
            <h3 className="filter-title">상세 조회</h3>
          </div>
          <div className="filter-body">
            {/* 검색어 입력 */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="검색어를 입력하세요"
            />
            {/* 지역 (시/도) 필터 */}
            <div className="filter-row">
              <label htmlFor="city">지역 (시/도):</label>
              <select
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">전체</option>
                {areaData.map((item) => (
                  <option key={item.city} value={item.city}>
                    {item.city}
                  </option>
                ))}
              </select>
            </div>

            {/* 지역 (시/군/구) 필터 */}
            <div className="filter-row">
              <label htmlFor="district">지역 (시/군/구):</label>
              <select
                id="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedCity}
              >
                <option value="">전체</option>
                {selectedCity &&
                  areaData
                    .find((item) => item.city === selectedCity)
                    ?.data.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
              </select>
            </div>
            {/* 성별 필터 */}
            <div className="filter-row">
              <label>성별:</label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value=""
                  checked={filters.gender === ""}
                  onChange={() => handleFilterChange("gender", "")}
                />
                전체
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="남"
                  checked={filters.gender === "남"}
                  onChange={() => handleFilterChange("gender", "남")}
                />
                남
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="여"
                  checked={filters.gender === "여"}
                  onChange={() => handleFilterChange("gender", "여")}
                />
                여
              </label>
            </div>

            {/* 나이 필터 */}
            <div className="filter-row">
              <label htmlFor="minAge">나이:</label>
              <input
                type="number"
                id="minAge"
                min="1"
                value={filters.minAge}
                onChange={(e) => handleFilterChange("minAge", e.target.value)}
              />
              세 이상
            </div>

            {/* 모임 유형 필터 */}
            <div className="filter-row">
              <label htmlFor="type">모임 유형:</label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              >
                <option value="">전체</option>
                <option value="1">정기모임</option>
                <option value="0">1회모임</option>
              </select>
            </div>

            {/* 카테고리 필터 */}
            <div className="filter-row">
              <label>카테고리:</label>
              {uniqueCategories.map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    value={category}
                    checked={filters.categories.includes(category)}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...filters.categories, category]
                        : filters.categories.filter((c) => c !== category);
                      handleFilterChange("categories", newCategories);
                    }}
                  />
                  {category}
                </label>
              ))}
            </div>

            {/* 활동 요일 필터 */}
            <div className="filter-row">
              <label>활동 요일:</label>
              <label>
                <input
                  type="checkbox"
                  value="일요일"
                  checked={filters.daysOfWeek.includes("일요일")}
                  onChange={(e) => {
                    const newDaysOfWeek = e.target.checked
                      ? [...filters.daysOfWeek, "일요일"]
                      : filters.daysOfWeek.filter((day) => day !== "일요일");
                    handleFilterChange("daysOfWeek", newDaysOfWeek);
                  }}
                />
                일요일
              </label>
              {/* 다른 요일들도 같은 방식으로 추가 */}
            </div>
            <button
              className="filter-apply-button"
              onClick={handleFilterSubmit}
            >
              필터 적용
            </button>
          </div>
        </div>
      )}

      <div className="search-results">
        <div>
          <h3>검색 결과</h3>
        </div>
        <div className="club-results">
          {isLoading ? (
            <p>Loading...</p>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((club) => (
              <Link
                key={club.clubId}
                to={`/club/${club.clubId}`}
                className="club-link"
              >
                <ClubItem club={club} />
              </Link>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchPage;
