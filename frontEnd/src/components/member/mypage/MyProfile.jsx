import { useEffect, useState } from "react";
import "/src/css/member/mypage/MyProfile.css";
import instance from "/src/auth/axios";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

const MyProfile = () => {
  const [isNickNameEditing, setIsNickNameEditing] = useState(false);
  const [isIntroEditing, setIsIntroEditing] = useState(false);
  const [nickName, setNickName] = useState("");
  const [introMg, setIntroMg] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [backImageSrc, setBackImageSrc] = useState("");
  const [tempNickName, setTempNickName] = useState(nickName);
  const [tempIntroMg, setTempIntroMg] = useState(introMg);
  const [file, setFile] = useState("");
  const [backFile, setBackFile] = useState("");
  const [userData, setUserData] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await instance.get(
          "http://localhost:8080/member/getProfile",
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUserData(response.data);
        setNickName(
          response.data.nickName
            ? response.data.nickName
            : response.data.userName
        );
        setIntroMg(response.data.userIntro);
        setImageSrc("data:image/jpeg;base64," + response.data.userImage);
        setBackImageSrc(
          "data:image/jpeg;base64," + response.data.userBackImage
        );
        setTempNickName(
          response.data.nickName
            ? response.data.nickName
            : response.data.userName
        );
        setTempIntroMg(response.data.userIntro);
      } catch (error) {
        console.error("마이페이지 프로필 로딩중 오류" + error);
      }
    };
    getProfile();
  }, []);

  const onChangeNickNameInput = (e) => {
    setTempNickName(e.target.value);
  };

  const onChangeIntroMgInput = (e) => {
    setTempIntroMg(e.target.value);
  };

  const handleNickNameEditClick = () => {
    setIsNickNameEditing(true);
    setTempNickName(nickName);
  };

  const handleNickNameCancelClick = () => {
    setIsNickNameEditing(false);
    setTempNickName(nickName);
  };

  const handleNickNameSaveClick = () => {
    setIsNickNameEditing(false);
    setNickName(tempNickName);
  };

  const handleIntroEditClick = () => {
    setIsIntroEditing(true);
    setTempIntroMg(introMg);
  };

  const handleIntroCancelClick = () => {
    setIsIntroEditing(false);
    setTempIntroMg(introMg);
  };

  const handleIntroSaveClick = () => {
    setIsIntroEditing(false);
    setIntroMg(tempIntroMg);
  };
  const onDeleteImage = () => {
    setImageSrc("/src/assets/images/blank_image.png");
  };
  const onBackDeleteImage = () => {
    setBackImageSrc("");
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
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("이미지 리사이즈 실패:", error);
      }
    }
  };

  const handleBackImageChange = async (event) => {
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
          setBackImageSrc(e.target.result);
          setBackFile(compressedFile);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("이미지 리사이즈 실패:", error);
      }
    }
  };

  const changeProfil = async () => {
    if (
      file === "" &&
      backFile === "" &&
      (userData.nickName ? userData.nickName : userData.userName) ===
      nickName &&
      userData.userImage === imageSrc.split("base64,")[1] &&
      (userData.userBackImage
        ? userData.userBackImage === backImageSrc.split("base64,")[1]
        : "null" === backImageSrc.split("base64,")[1]) &&
      userData.userIntro === introMg
    ) {
      alert("변경된 데이터가 없습니다.");
    } else {
      try {
        const formData = new FormData();
        formData.append("nickName", nickName);
        if (file) {
          formData.append("userImage", file, file.name);
        }
        if (backFile) {
          formData.append("userBackImage", backFile, backFile.name);
        }
        formData.append("userIntro", introMg);
        if (
          imageSrc !== "/src/assets/images/blank_image.png" &&
          imageSrc.split("base64,")[1] !== userData.userImage
        ) {
          formData.append("checkImage", "1");
        } else if (imageSrc === "/src/assets/images/blank_image.png") {
          formData.append("checkImage", "0");
        } else {
          formData.append("checkImage", "-1");
        }
        if (
          backImageSrc !== "" &&
          (userData.userBackImage
            ? userData.userBackImage !== backImageSrc.split("base64,")[1]
            : "null" !== backImageSrc.split("base64,")[1])
        ) {
          formData.append("checkBack", "1");
        } else if (backImageSrc === "") {
          formData.append("checkBack", "0");
        } else {
          formData.append("checkBack", "-1");
        }
        await instance.post(
          "http://localhost:8080/member/updateProfile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("프로필이 변경되었습니다.");
      } catch (error) {
        console.error("프로필 변경 중 오류 발생" + error);
      }
    }
  };

  return (
    <>
      <div className="MyProfile">
        <div className="MyProfileHeader">
          <h4>프로필 관리</h4>
        </div>
        <div className="MyProfileInfoArea">
          <input
            type="file"
            id="MyProfileFile"
            name="MyProfileFile"
            accept=".jpg, .jpeg, .png, .gif, .webp"
            onChange={handleImageChange}
          />
          <input
            type="file"
            id="MyProfileBackFile"
            name="MyProfileBackFile"
            accept=".jpg, .jpeg, .png, .gif, .webp"
            onChange={handleBackImageChange}
          />
          <div
            className="MyProfileImageArea"
            style={{ backgroundImage: `url(${backImageSrc})` }}
          >
            <div className="MyProfileBackImage"></div>
            <img className="MyProfileUserIamge" src={imageSrc} />
            <div className="MyProfileIntroArea">
              <div className="MyProfileNickName">{nickName}</div>
              <div className="MyProfileIntroMg">{introMg}</div>
            </div>
          </div>
          <div className="MyProfileImgEditor">
            <div className="MyProfileChangeButtonArea">
              <div>
                <label
                  className="MyProfileChangeButton"
                  htmlFor="MyProfileBackFile"
                >
                  배경 이미지 변경
                </label>
                <button
                  className="MyProfileDeleteButton"
                  onClick={onBackDeleteImage}
                >
                  삭제
                </button>
              </div>
              <div>
                <label
                  className="MyProfileChangeButton"
                  htmlFor="MyProfileFile"
                >
                  프로필 이미지 변경
                </label>
                <button
                  className="MyProfileDeleteButton"
                  onClick={onDeleteImage}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="MyProfileUpdateInfoArea">
          <h4>프로필 정보</h4>

          {!isNickNameEditing ? (
            <div className="MyProfileInfoGroup">
              <h5>닉네임</h5>
              <div className="MyProfileInfoBox">
                <div className="MyPageUnit_content">
                  <p>{nickName}</p>
                  <button onClick={handleNickNameEditClick}>변경</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="MyProfileModifyBox">
              <div className="MyProfileInputBox">
                <h6>닉네임</h6>
                <div className="MyProfileInputItem">
                  <input
                    type="text"
                    value={tempNickName}
                    onChange={onChangeNickNameInput}
                  />
                </div>
                <p>
                  변경 후 30일이 지나야 다시 변경 가능하므로 신중히
                  변경해주세요.
                </p>
              </div>
              <div className="MyProfileInputButton">
                <button
                  className="MyProfileCancelButton"
                  onClick={handleNickNameCancelClick}
                >
                  취소
                </button>
                <button
                  className="MyProfileRegisterButton"
                  onClick={handleNickNameSaveClick}
                >
                  저장
                </button>
              </div>
            </div>
          )}

          {!isIntroEditing ? (
            <div className="MyProfileInfoGroup">
              <h5>상태메세지</h5>
              <div className="MyProfileInfoBox">
                <div className="MyPageUnit_content">
                  <p>{tempIntroMg}</p>
                  <button onClick={handleIntroEditClick}>변경</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="MyProfileModifyBox">
              <div className="MyProfileInputBox">
                <h6>상태메세지</h6>
                <div className="MyProfileInputItem">
                  <input
                    type="text"
                    value={tempIntroMg}
                    onChange={onChangeIntroMgInput}
                  />
                </div>
              </div>
              <div className="MyProfileInputButton">
                <button
                  className="MyProfileCancelButton"
                  onClick={handleIntroCancelClick}
                >
                  취소
                </button>
                <button
                  className="MyProfileRegisterButton"
                  onClick={handleIntroSaveClick}
                >
                  저장
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="MyProfileModifySaveButtonArea">
          <button
            onClick={() => {
              changeProfil();
            }}
          >
            프로필 변경
          </button>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
