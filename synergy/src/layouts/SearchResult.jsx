import React, { useState } from "react";
import "/src/css/searchresult.css";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    minAge: "",
    maxAge: "",
    type: "",
    categories: [],
    daysOfWeek: [],
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // 검색 결과 데이터 (실제로는 API 호출 등을 통해 가져와야 합니다.)
  const searchResults = [
    {
      id: 1,
      title: "스터디 모집",
      region: "서울",
      gender: "무관",
      minAge: 20,
      maxAge: 30,
      type: "정기",
      categories: ["스터디", "취미"],
      daysOfWeek: ["월", "수"],
    },
    {
      id: 2,
      title: "맛집 탐방",
      region: "경기",
      gender: "여성",
      minAge: 25,
      maxAge: 35,
      type: "일회성",
      categories: ["맛집"],
      daysOfWeek: ["토"],
    },
    {
      id: 3,
      title: "운동 파트너 구함",
      region: "서울",
      gender: "남성",
      minAge: 30,
      maxAge: 40,
      type: "정기",
      categories: ["운동"],
      daysOfWeek: ["화", "목"],
    },
  ];

  const [applyFilter, setApplyFilter] = useState(false); // 필터 적용 여부 상태 추가

  const handleApplyFilter = () => {
    setApplyFilter(true); // 필터 적용 상태 변경
  };

  const filteredResults = applyFilter
    ? searchResults.filter((result) => {
        const matchesSearchTerm = result.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesRegion =
          !filters.region || result.region === filters.region;
        const matchesGender =
          !filters.gender || result.gender === filters.gender;
        const matchesAge =
          (!filters.minAge || result.minAge >= filters.minAge) &&
          (!filters.maxAge || result.maxAge <= filters.maxAge);
        const matchesType = !filters.type || result.type === filters.type;
        const matchesCategories =
          filters.categories.length === 0 ||
          filters.categories.every((cat) => result.categories.includes(cat));
        const matchesDaysOfWeek =
          filters.daysOfWeek.length === 0 ||
          filters.daysOfWeek.every((day) => result.daysOfWeek.includes(day));

        return (
          matchesSearchTerm &&
          matchesRegion &&
          matchesGender &&
          matchesAge &&
          matchesType &&
          matchesCategories &&
          matchesDaysOfWeek
        );
      })
    : searchResults;

  return (
    <section className="search-page">
      <div className="filter-section">
        <div className="filter-header">
          <h3 className="filter-title">상세 조회</h3>
        </div>
        <div className="filter-body">
          <div className="filter-row">
            <label htmlFor="region">지역:</label>
            <select
              id="region"
              value={filters.region}
              onChange={(e) => handleFilterChange("region", e.target.value)}
            >
              <option value="">전체</option>
              <option value="서울">서울</option>
              <option value="경기">경기도</option>
              <option value="경기">강원도</option>
              <option value="경기">충청도</option>
              <option value="경기">경상도</option>
              <option value="경기">전라도</option>
              <option value="경기">광역시</option>
              <option value="경기">제주</option>
              {/* ... 더 많은 지역 추가 */}
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
              onChange={(e) => handleFilterChange("minAge", e.target.value)}
              placeholder="최소"
            />
            ~
            <input
              type="number"
              id="maxAge"
              value={filters.maxAge}
              onChange={(e) => handleFilterChange("maxAge", e.target.value)}
              placeholder="최대"
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
              스포츠
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
                maxAge: "",
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
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="검색어를 입력하세요"
        />
        <ul>
          {filteredResults.map((result) => (
            <li key={result.id} className="search-result-item">
              <h4>{result.title}</h4>
              <p>{result.region}</p>
              <p>{result.gender}</p>
              <p>
                {result.minAge} ~ {result.maxAge}
              </p>
              <p>{result.type}</p>
              <p>{result.categories}</p>
              <p>{result.daysOfWeek}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SearchPage;
