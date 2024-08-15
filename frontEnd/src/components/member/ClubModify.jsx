import { useEffect, useMemo, useState } from "react";
import "/src/css/member/ClubModify.css";
import CustomQuill from "/src/common/CustomQuill";
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import instance from "/src/common/auth/axios";
import imageCompression from "browser-image-compression";
import { areaData } from "/src/common/areaData";

const ClubModify = () => {
  const param = useParams();
  const nav = useNavigate();
  const [clubData, setClubData] = useState("");
  const [clubTitle, setClubTitle] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [dayValue, setDayValue] = useState("");
  const [maxMember, setMaxMember] = useState("");
  const [clubGender, setClubGender] = useState("");
  const [ageLimit, setAgeLimit] = useState("");
  const [regularyType, setRegularyType] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [imageSrc, setImageSrc] = useState(``);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [recruitment, setRecruitment] = useState("");

  useEffect(() => {
    const clubData = async () => {
      try {
        const response = await instance.get(
          `http://localhost:8080/api/club/modify/${param.no}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setClubData(response.data);
        setCategory(response.data.category);
        setAgeLimit(response.data.ageLimit);
        setClubGender(response.data.clubGender);
        setMaxMember(response.data.maxMember);
        setClubTitle(response.data.clubTitle);
        setRegularyType(response.data.regularType);
        setMessage(response.data.regularType === 0 ? "만나는 날" : "모임 주기");
        setType(response.data.regularType === 0 ? "date" : "text");
        setDayValue(response.data.dday);
        setSelectedButton(response.data.regularType);
        setImageSrc("data:image/jpeg;base64," + response.data.clubImage);
        setSelectedCity(response.data.city);
        setSelectedDistrict(response.data.district);
        setContent(response.data.detailInfo);
        setRecruitment(response.data.recruitment);
      } catch (error) {
        console.error("클럽 정보 로딩 중 오류", error);
      }
    };
    clubData();
  }, [param]);

  //react-quill 라이브러리 사용
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
      },
    };
  }, []);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setSelectedDistrict("");
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
  };

  const getDistricts = (city) => {
    const selectedArea = areaData.find((area) => area.city === city);
    return selectedArea ? selectedArea.data : [];
  };

  const changeMaxPerson = (e) => {
    const regex = /^\d*$/;
    if (regex.test(e.target.value)) {
      setMaxMember(e.target.value);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
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
    }
  };

  //input값 업데이트
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
      setType("text");
      setMessage("모임 주기");
      setDayValue("");
    }
  };

  const onRegisterClub = async () => {
    if (
      dayValue === "" ||
      regularyType === "" ||
      selectedButton === "" ||
      selectedCity === "" ||
      clubTitle === "" ||
      !category === "" ||
      ageLimit === "" ||
      maxMember === ""
    ) {
      alert(
        "모임명,카테고리,모임주기,정원,모집 나이,지역은 필수입력 사항입니다."
      );
    } else {
      try {
        const formData = new FormData();
        formData.append("clubNo", clubData.clubNo);
        formData.append("clubTitle", clubTitle);
        formData.append("clubGender", clubGender);
        formData.append("category", category);
        formData.append("city", selectedCity);
        formData.append("ageLimit", ageLimit);
        formData.append("regularType", regularyType);
        formData.append("maxMember", maxMember);
        formData.append("dDay", dayValue);
        formData.append("detailInfo", content);
        formData.append("recruitment", recruitment);
        if (file) {
          formData.append("clubImage", file, file.name);
        }

        if (selectedDistrict === "") {
          formData.append("district", "전체");
        } else {
          formData.append("district", selectedDistrict);
        }
        if (
          imageSrc !== "" &&
          imageSrc.split("base64,")[1] !== clubData.clubImage
        ) {
          formData.append("checkImage", "1");
        } else {
          formData.append("checkImage", "0");
        }

        await instance
          .post("/api/club/modify", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            alert("모임수정이 완료되었습니다.");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            alert(
              "모임 수정 요청 중 오류가 발생하였습니다 \n 잠시 후 다시 시도해주세요"
            );
          });
      } catch (error) {
        console.log(error);
        alert(
          "모임 수정 요청 중 오류가 발생하였습니다 \n 잠시 후 다시 시도해주세요"
        );
      }
    }
  };
  const deleteClub = async () => {
    try {
      const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
      if (isConfirmed) {
        await instance.post(`/api/club/deleteClub/${param.no}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        nav('/mypage/madeclub', { replace: true });
      }
    } catch (error) {
      console.error("모임 삭제중 에러 발생" + error);
    }
  }
  const buttonStyles = {
    default: { backgroundColor: "white", color: "black" },
    selected: { backgroundColor: "black", color: "white" },
  };

  return (
    <>
      <div className="MyClubManagerMainArea">
        <div className="myclubmanagerbutton">
          <Button
            variant="primary"
            onClick={() => nav(`/mypage/clubmanager/modify/${param.no}`)}
          >
            정보 수정
          </Button>{" "}
          <Button
            variant="primary"
            onClick={() => nav(`/mypage/clubmanager/member/${param.no}`)}
          >
            모임 멤버
          </Button>{" "}
          <Button
            variant="primary"
            onClick={() => nav(`/mypage/clubmanager/accept/${param.no}`)}
          >
            신청 관리
          </Button>{" "}
        </div>
        <div className="MyClubManagerContentArea">
          <div className="ClubModify">
            <div className="ClubModifyWrap">
              <div className="ClubModifyTopArea">
                <div className="ClubModifyTopBox">
                  <div className="ClubModifyfileBox">
                    <div>
                      <span>모임 프로필 사진</span>
                      <div className="ClubModifyPreview">
                        <img src={imageSrc} alt="미리보기" />
                      </div>
                      <div className="clubmodifyimginput">
                        <input
                          className="ClubModifyupload-name"
                          value={fileInput}
                          onChange={handleImageChange}
                          placeholder="이미지 "
                          readOnly
                        />
                        <label htmlFor="imageUpload">파일찾기</label>
                        <input
                          type="file"
                          id="imageUpload"
                          accept=".jpg, .jpeg, .png, .gif, .webp"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ClubModifyNcBox">
                    <div className="ClubModifyStateBox">
                      <label htmlFor="ClubState">모집 상태</label>
                      <select
                        type="text"
                        name="ClubState"
                        id="ClubState"
                        value={recruitment}
                        onChange={(e) => {
                          setRecruitment(e.target.value);
                        }}
                      >
                        <option value={1}>모집 중</option>
                        <option value={0}>모집 마감</option>
                      </select>
                    </div>
                    <div className="ClubModifyNameBox">
                      <label htmlFor="ClubName">모임명</label>
                      <input
                        type="text"
                        name="ClubName"
                        id="ClubName"
                        value={clubTitle}
                        onChange={(e) => {
                          setClubTitle(e.target.value);
                        }}
                      />
                    </div>
                    <div className="ClubModifyCategoryBox">
                      <label htmlFor="ClubModifyCategory">카테고리</label>
                      <select
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option value={""}>선택하세요</option>
                        <option value="친목">친목</option>
                        <option value="독서">독서</option>
                        <option value="전시">전시</option>
                        <option value="스포츠">스포츠</option>
                        <option value="스터디">스터디</option>
                        <option value="맛집탐방">맛집탐방</option>
                        <option value="취미활동">취미활동</option>
                      </select>
                    </div>
                    <div className="ClubModifyChoice">
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
                <div className="ClubModifyChoiceArea">
                  <div className="ClubModifyChoiceSection">
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
                            {getDistricts(selectedCity).map(
                              (district, index) => (
                                <li
                                  key={index}
                                  data-dis={district}
                                  onClick={() => handleDistrictClick(district)}
                                >
                                  {district}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="ClubModifyChoiceBoxArea">
                      <div className="ClubModifyChoiceBox">
                        <label htmlFor="">{message}</label>
                        <input
                          type={type}
                          name="regularyType"
                          value={dayValue}
                          onChange={onSetInput}
                        />
                      </div>
                      <div className="ClubModifyChoiceBox">
                        <label htmlFor="MaxPerson">정원</label>
                        <input
                          type="text"
                          name="MaxPerson"
                          id="MaxPerson"
                          value={maxMember}
                          onChange={changeMaxPerson}
                        />
                      </div>
                      <div className="ClubModifyChoiceBox">
                        <label htmlFor="ClubGender">모집 성별</label>
                        <select
                          name="ClubGender"
                          id="ClubGender"
                          value={clubGender}
                          onChange={(e) => {
                            setClubGender(e.target.value);
                          }}
                        >
                          <option defaultValue="제한없음" defaultChecked>
                            제한없음
                          </option>
                          <option value="M">남자만</option>
                          <option value="F">여자만</option>
                        </select>
                      </div>
                      <div className="ClubModifyChoiceBox">
                        <label htmlFor="">모집 나이</label>
                        <input
                          type="text"
                          value={ageLimit}
                          onChange={(e) => {
                            setAgeLimit(e.target.value);
                          }}
                        />
                      </div>
                      <div className="ClubModifyChoiceBox">
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
              <div className="ClubModifySection">
                <h3>상세 정보</h3>
                <CustomQuill
                  width={1000}
                  height={300}
                  content={content}
                  setContent={setContent}
                />
              </div>
              <div className="ClubModifyButtonArea">
                <button className="modifyButton" onClick={() => { onRegisterClub(); }}>수정 </button>
                <button className="deleteClubButton" onClick={() => { deleteClub() }}>삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubModify;
