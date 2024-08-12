import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/src/css/member/asidebutton.css";
import ChatListModal from "/src/components/member/ChatListModal";
import firstImage from "/src/assets/images/check-list.png";
import secondImage from "/src/assets/images/comments.png";
import thirdImage from "/src/assets/images/calendar.png";
import cancelImage from "/src/assets/images/cancel.png";
import instance from "/src/common/auth/axios"; // Axios 인스턴스 가져오기

function AsideButton() {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdditionalImages, setShowAdditionalImages] = useState(false);
  const [currentImage, setCurrentImage] = useState(firstImage);
  const [profile, setProfile] = useState(null);

  // 프로필 정보를 가져오는 함수
  const fetchProfile = async () => {
    try {
      const response = await instance.get("/member/getProfile", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(response.data);
    } catch (error) {
      console.error("프로필 정보 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchProfile(); // 컴포넌트 마운트 시 프로필 정보 가져오기
  }, []);

  const openChatListModal = () => {
    if (!profile) {
      return;
    }
    console.log("Opening Chat List Modal");
    setIsModalOpen(true);
  };

  const toggleAdditionalImages = () => {
    console.log("Toggling Additional Images");
    setShowAdditionalImages((prev) => !prev);
  };

  const handleThirdImageClick = () => {
    navigate("/newclub"); // ClubRegister 페이지로 이동
  };

  useEffect(() => {
    setCurrentImage(showAdditionalImages ? cancelImage : firstImage);
  }, [showAdditionalImages]);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.opacity = 1; // 이미지 로드 시 페이드 인 효과 적용
    }
  }, [currentImage]);

  return (
    <div className="main-page">
      <img
        ref={imageRef}
        src={currentImage}
        alt="Main Image"
        className="main-image"
        onClick={toggleAdditionalImages}
      />

      <div
        className={`additional-images ${showAdditionalImages ? "show" : ""}`}
      >
        <img
          src={secondImage}
          alt="Second Image"
          className="additional-image"
          onClick={openChatListModal}
        />
        <img
          src={thirdImage}
          alt="Third Image"
          className="additional-image"
          onClick={handleThirdImageClick} // thirdImage 클릭 시 handleThirdImageClick 실행
        />
      </div>

      {isModalOpen && (
        <div
          className="modal-overlay show"
          onClick={() => {
            console.log("Modal close triggered");
            setIsModalOpen(false);
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ChatListModal
              onClose={() => setIsModalOpen(false)}
              profile={profile} // ChatListModal에 profile 전달
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AsideButton;
