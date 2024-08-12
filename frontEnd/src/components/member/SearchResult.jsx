import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "/src/css/member/searchresult.css";
import ClubItem from "./ClubItem";
import { areaData } from "/src/common/areaData"


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
  const [filteredResults, setFilteredResults] = useState([]);

  let latestFilters = useRef(filters);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/club/search", {
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
          setFilteredResults(data);
          console.log(data);
        }
      } catch (error) {
        console.error("클럽 데이터 가져오기 오류:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

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
    setFilteredResults(results);
  };

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
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="검색어를 입력하세요"
            />
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
              <div
                key={club.clubId || club.uniqueIdentifier}
                className="club-link"
              >
                <ClubItem club={club} />
              </div>
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
