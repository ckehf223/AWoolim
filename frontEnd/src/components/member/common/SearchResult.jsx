import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "/src/css/member/common/searchresult.css";
import ClubItem from "/src/components/member/club/ClubItem";
import { areaData } from "/src/common/areaData";
import axios from "axios";

function SearchPage() {
  const location = useLocation();
  const initialSearchTerm = location.state?.searchTerm || "";
  const [filters, setFilters] = useState({
    clubTitle: initialSearchTerm,
    city: "",
    district: "",
    clubGender: "",
    regularType: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/club/search",
        {
          params: filters,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.data != null) {
        setClubs(response.data);
      }
      setIsLoading(true);
    } catch (error) {
      console.error("검색한 모임정보 가져오는 중 오류 발생" + error);
      setIsLoading(true);
    }
  };

  const handleFilterChange = (name, value) => {
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
  console.log(filters);
  const handleApplyFilter = () => {
    setShowFilterSection(!showFilterSection);
  };
  const handleresetFilter = () => {
    setFilters({
      clubTitle: "",
      city: "",
      district: "",
      clubGender: "",
      regularType: "",
      category: "",
    });
    setSelectedCity("");
    setSelectedDistrict("");
  };

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
              value={filters.clubTitle}
              onChange={(e) => {
                handleFilterChange("clubTitle", e.target.value);
              }}
              placeholder="검색어를 입력하세요"
            />
            <div className="areaDatadiv">
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
                      ?.data.map((district) => {
                        if (district !== "전체") {
                          return (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          );
                        }
                      })}
                </select>
              </div>
            </div>

            <div className="filter-row">
              <label>성별:</label>
              <label>
                <input
                  type="radio"
                  name="clubGender"
                  value=""
                  checked={filters.clubGender === ""}
                  onChange={() => handleFilterChange("clubGender", "")}
                />
                전체
              </label>
              <label>
                <input
                  type="radio"
                  name="clubGender"
                  value="남"
                  checked={filters.clubGender === "M"}
                  onChange={() => handleFilterChange("clubGender", "M")}
                />
                남
              </label>
              <label>
                <input
                  type="radio"
                  name="clubGender"
                  value="여"
                  checked={filters.clubGender === "F"}
                  onChange={() => handleFilterChange("clubGender", "F")}
                />
                여
              </label>
            </div>
            <div className="filter-row">
              <label htmlFor="type">모임 유형:</label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) =>
                  handleFilterChange("regularType", e.target.value)
                }
              >
                <option value="">전체</option>
                <option value="1">정기모임</option>
                <option value="0">1회모임</option>
              </select>
            </div>

            <div className="filter-row">
              <label>카테고리:</label>
              <select
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option defaultChecked value="">
                  선택하세요
                </option>
                <option defaultChecked value="친목">
                  친목
                </option>
                <option defaultChecked value="독서">
                  독서
                </option>
                <option defaultChecked value="전시">
                  전시
                </option>
                <option defaultChecked value="스포츠">
                  스포츠
                </option>
                <option defaultChecked value="스터디">
                  스터디
                </option>
                <option defaultChecked value="맛집탐방">
                  맛집탐방
                </option>
                <option defaultChecked value="취미활동">
                  취미활동
                </option>
              </select>
            </div>

            <div className="filterapplybuttondiv">
              <button
                className="filter-apply-button"
                onClick={() => {
                  fetchClubs();
                }}
              >
                필터 적용
              </button>
              <button
                className="filter-apply-button2"
                onClick={() => {
                  handleresetFilter();
                }}
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="search-results">
        <div>
          <h3>검색 결과</h3>
        </div>
        <div className="club-results">
          {!isLoading ? (
            <p>Loading...</p>
          ) : clubs.length > 0 ? (
            clubs.map((club) => (
              <div key={club.clubNo} className="club-link">
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