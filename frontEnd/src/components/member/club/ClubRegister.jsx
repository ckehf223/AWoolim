import { useState } from "react";
import "/src/css/member/club/ClubRegister.css";
import "react-quill/dist/quill.snow.css";
import CustomQuill from "/src/common/CustomQuill";
import instance from "/src/auth/axios";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { areaData } from "/src/common/areaData";

const ClubRegister = () => {
  const nav = useNavigate();
  const [type, setType] = useState("hidden");
  const [message, setMessage] = useState("");
  const [dayValue, setDayValue] = useState("");
  const [regularyType, setRegularyType] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [imageSrc, setImageSrc] = useState("/src/assets/images/image.png");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [content, setContent] = useState("");
  const [clubName, setClubName] = useState("");
  const [category, setCategory] = useState("");
  const [maxPerson, setMaxPerson] = useState("");
  const [gender, setGender] = useState("제한없음");
  const [age, setAge] = useState("제한없음");
  const [file, setFile] = useState("");

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const changeClubName = (e) => {
    setClubName(e.target.value);
  };
  const changeCategory = (e) => {
    setCategory(e.target.value);
  };

  const changeMaxPerson = (e) => {
    const regex = /^\d*$/;
    if (regex.test(e.target.value)) {
      setMaxPerson(e.target.value);
    }
  };

  const changeGender = (e) => {
    setGender(e.target.value);
  };
  const changeAge = (e) => {
    setAge(e.target.value);
  };
  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
  };

  const getDistricts = (city) => {
    const selectedArea = areaData.find((area) => area.city === city);
    return selectedArea ? selectedArea.data : [];
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const options = {
      maxSizeMB: 2,
      maxWidth: 1920,
      maxHeight: 1080,
      useWebWorker: true,
    };
    if (file && file.type.startsWith("image/")
      && file.size < options.maxSizeMB
      && file.width < options.maxWidth
      && file.height < options.maxHeight) {
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target.result);
          setFile(compressedFile);
          setFileInput(compressedFile.name);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("이미지 리사이즈 실패:", error);
      }
    } else {
      alert('업로드 할 수 없는 파일 입니다.');
    }
  };

  const onSetInput = function (e) {
    setDayValue(e.target.value);
  };

  const handleClick = (buttonId) => {
    setSelectedButton(buttonId);
    setRegularyType(buttonId);
    if (buttonId === 0) {
      setType("date");
      setMessage("만나는 날");
      setDayValue("");
    } else {
      setMessage("만나는 날");
      setDayValue("");
    }
  };

  const onDeleteImage = () => {
    setImageSrc("/assets/images/image.png");
    setFileInput("");
    setFile("");
  };

  const onRegisterClub = () => {
    if (
      dayValue === "" ||
      regularyType === "" ||
      selectedButton === "" ||
      selectedCity === "" ||
      clubName === "" ||
      category === "" ||
      age === "" ||
      maxPerson === ""
    ) {
      alert(
        "모임명, 카테고리, 모임 주기, 정원, 모집 나이, 지역은 필수 입력 사항입니다."
      );
    } else {
      try {
        const formData = new FormData();
        formData.append("clubTitle", clubName);
        formData.append("clubGender", gender);
        formData.append("category", category);
        formData.append("city", selectedCity);
        formData.append("ageLimit", age);
        formData.append("regularType", regularyType);
        formData.append("maxMember", maxPerson);
        formData.append("dDay", dayValue);
        formData.append("detailInfo", content);
        if (file) {
          formData.append("clubImage", file, file.name);
        }
        if (selectedDistrict === "") {
          formData.append("district", "전체");
        } else {
          formData.append("district", selectedDistrict);
        }
        instance
          .post("/api/club/register", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data === 1) {
              alert("모임 등록이 완료되었습니다.");
              nav("/", { replace: true });
            } else {
              alert(
                "최대 개설 가능 모임은 3개입니다.\n기존 모임 삭제 후 이용 가능합니다."
              );
              nav("/", { replace: true });
            }
          })
          .catch((error) => {
            console.log(error);
            alert(
              "모임 등록 요청 중 오류가 발생하였습니다. \n 잠시 후 다시 시도해주세요."
            );
          });
      } catch (error) {
        console.log(error);
        alert(
          "모임 등록 요청 중 오류가 발생하였습니다. \n 잠시 후 다시 시도해주세요."
        );
      }
    }
  };

  const buttonStyles = {
    default: { backgroundColor: "white", color: "rgb(22, 22, 22)" },
    selected: { backgroundColor: "rgb(22, 22, 22)", color: "white" },
  };

  return (
    <div className="ClubRegister">
      <div className="ClubRegisterWrap">
        <div className="ClubRegisterHeader">
          <span>모임 개설</span>
          <img src="/assets/images/tent.png" alt="" />
        </div>
        <div className="ClubRegisterTopArea">
          <div className="ClubRegisterTopBox">
            <div className="fileBox">
              <div className="preview">
                <img src={imageSrc} alt="미리보기" />
              </div>
              <input
                className="upload-name"
                value={fileInput}
                onChange={handleImageChange}
                placeholder="첨부파일"
                disabled
              />
              <label htmlFor="imageUpload">파일찾기</label>
              <input
                type="file"
                id="imageUpload"
                accept=".jpg, .jpeg, .png, .gif, .webp"
                onChange={handleImageChange}
              />
              <button
                className="ClubRegisterImageDeleteButton"
                onClick={onDeleteImage}
              >
                삭제
              </button>
            </div>
            <div className="ClubRegisterNcBox">
              <div className="ClubRegisterNameBox">
                <label htmlFor="ClubName">모임명</label>
                <input
                  type="text"
                  name="ClubName"
                  id="ClubName"
                  value={clubName}
                  onChange={changeClubName}
                />
              </div>
              <div className="ClubCategoryBox">
                <label htmlFor="ClubCategory">카테고리</label>
                <select value={category} onChange={changeCategory}>
                  <option value="" defaultChecked>
                    선택하세요
                  </option>
                  <option value="스포츠">스포츠</option>
                  <option value="맛집탐방">맛집탐방</option>
                  <option value="독서">독서</option>
                  <option value="친목">친목</option>
                  <option value="전시">전시</option>
                  <option value="취미활동">취미활동</option>
                  <option value="스터디">스터디</option>
                </select>
              </div>
              <div className="ClubRegisterChoice">
                <button
                  className="daySelect"
                  style={
                    selectedButton === 0
                      ? buttonStyles.selected
                      : buttonStyles.default
                  }
                  onClick={() => {
                    handleClick(0);
                  }}
                >
                  일회성
                </button>
                <button
                  className="daySelect"
                  style={
                    selectedButton === 1
                      ? buttonStyles.selected
                      : buttonStyles.default
                  }
                  onClick={() => {
                    handleClick(1);
                  }}
                >
                  정기모임
                </button>
              </div>
            </div>
          </div>
          <div className="ClubRegisterChoiceArea">
            <div className="ClubRegisterChoiceSection">
              <div className="venueBox">
                <span>지역 선택</span>
                <div className="venueChoice">
                  <div className="venueChoiceLocal">
                    <ul>
                      {areaData.map((area, index) => (
                        <li
                          key={index}
                          onClick={() => handleCityClick(area.city)}
                        >
                          {area.city}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="venueChoiceCity">
                    <ul>
                      {getDistricts(selectedCity).map((district, index) => (
                        <li
                          key={index}
                          data-dis={district}
                          onClick={() => handleDistrictClick(district)}
                        >
                          {district}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="choiceBoxArea">
                <div className="choiceBox">
                  <label htmlFor="">{message}</label>
                  {regularyType !== "" && selectedButton === 0 && (
                    <input
                      type={type}
                      name="regularyType"
                      value={dayValue}
                      onChange={(e) => {
                        setDayValue(e.target.value);
                      }}
                      min={getTodayDate()}
                    />
                  )}
                  {regularyType !== "" && selectedButton === 1 && (
                    <select
                      name="regularyType"
                      value={dayValue}
                      onChange={(e) => {
                        setDayValue(e.target.value);
                      }}
                    >
                      <option value="" defaultChecked>
                        선택하세요
                      </option>
                      <option value="월요일">월요일</option>
                      <option value="화요일">화요일</option>
                      <option value="수요일">수요일</option>
                      <option value="목요일">목요일</option>
                      <option value="금요일">금요일</option>
                      <option value="토요일">토요일</option>
                      <option value="일요일">일요일</option>
                    </select>
                  )}
                </div>
                <div className="choiceBox">
                  <label htmlFor="MaxPerson">정원</label>
                  <input
                    type="text"
                    name="MaxPerson"
                    id="MaxPerson"
                    value={maxPerson}
                    onChange={changeMaxPerson}
                    placeholder="숫자만 입력"
                  />
                </div>
                <div className="choiceBox">
                  <label htmlFor="ClubGender">모집 성별</label>
                  <select
                    name="ClubGender"
                    id="ClubGender"
                    value={gender}
                    onChange={changeGender}
                  >
                    <option value="제한없음">제한없음</option>
                    <option value="M">남자만</option>
                    <option value="F">여자만</option>
                  </select>
                </div>
                <div className="choiceBox">
                  <label htmlFor="">모집 나이</label>
                  <input type="text" value={age} onChange={changeAge} />
                </div>
                <div className="choiceBox">
                  <label htmlFor="">지역</label>
                  <input
                    type="text"
                    readOnly
                    value={selectedCity + " " + selectedDistrict}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ClubRegisterSection">
          <h3>상세 정보</h3>
          <CustomQuill
            width={1000}
            height={300}
            content={content}
            setContent={setContent}
          />
        </div>
        <div className="ClubRegisterButtonArea">
          <button className="registerButton" onClick={onRegisterClub}>
            등록
          </button>
          <button className="cancelButton">취소</button>
        </div>
      </div>
    </div>
  );
};

export default ClubRegister;