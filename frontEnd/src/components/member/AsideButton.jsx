import React, { useState, useRef } from "react";
import "/src/css/member/asidebutton.css";
import ChatListModal from "/src/components/member/ChatListModal";
import firstImage from "/src/assets/images/check-list.png";
import secondImage from "/src/assets/images/comments.png";
import thirdImage from "/src/assets/images/calendar.png";
import cancelImage from "/src/assets/images/cancel.png";

function AsideButton() {
  const imageRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdditionalImages, setShowAdditionalImages] = useState(false);
  const [currentImage, setCurrentImage] = useState(firstImage);

  const openChatListModal = () => {
    setIsModalOpen(true);
  };

  const toggleAdditionalImages = () => {
    setShowAdditionalImages(!showAdditionalImages);
    setCurrentImage(showAdditionalImages ? firstImage : cancelImage);
  };

  return (
    <div className="main-page">
      <img
        ref={imageRef}
        src={currentImage}
        alt="Main Image"
        className="main-image"
        onClick={toggleAdditionalImages}
        onLoad={() => {
          if (imageRef.current) {
            imageRef.current.style.opacity = 1; // 이미지 로드 시 페이드 인 효과 적용
          }
        }}
      />

      <div
        className={`additional-images ${showAdditionalImages ? "show" : ""}`}
      >
        {/* showAdditionalImages 상태에 따라 클래스 추가/제거 */}
        <img
          src={secondImage}
          alt="Second Image"
          className="additional-image"
          onClick={openChatListModal}
        />
        <img src={thirdImage} alt="Third Image" className="additional-image" />
      </div>

      <div className={`modal-overlay ${isModalOpen ? "show" : ""}`}>
        <ChatListModal onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}

export default AsideButton;
