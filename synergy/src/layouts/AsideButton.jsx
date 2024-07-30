import React, { useState } from "react";
import "/src/css/asidebutton.css";
import ChatListModal from "./ChatListModal";
import firstImage from "/src/images/github.png";
import secondImage from "/src/images/insta.png";
import thirdImage from "/src/images/kakao.png";

function AsideButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdditionalImages, setShowAdditionalImages] = useState(false); // 추가 이미지 표시 상태

  const openChatListModal = () => {
    setIsModalOpen(true);
  };

  const toggleAdditionalImages = () => {
    setShowAdditionalImages(!showAdditionalImages); // 이미지 표시 상태 토글
  };

  return (
    <div className="main-page">
      <img
        src={firstImage}
        alt="First Image"
        className="main-image"
        onClick={toggleAdditionalImages}
      />

      {showAdditionalImages && ( // 추가 이미지 표시 여부에 따라 조건부 렌더링
        <div className="additional-images">
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
          />
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <ChatListModal onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default AsideButton;
