import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/src/css/member/common/asidebutton.css";
import ChatListModal from "/src/components/member/modal/ChatListModal";
import firstImage from "/assets/images/check-list.png";
import secondImage from "/assets/images/comments.png";
import thirdImage from "/assets/images/calendar.png";
import cancelImage from "/assets/images/cancel.png";
import { useAuth } from "/src/common/AuthContext";

function AsideButton() {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdditionalImages, setShowAdditionalImages] = useState(false);
  const [currentImage, setCurrentImage] = useState(firstImage);
  const { isAuthenticated } = useAuth();


  const openChatListModal = () => {
    setIsModalOpen(true);
  };

  const toggleAdditionalImages = () => {
    setShowAdditionalImages((prev) => !prev);
  };

  const handleThirdImageClick = () => {
    navigate("/newclub");
  };

  useEffect(() => {
    setCurrentImage(showAdditionalImages ? cancelImage : firstImage);
  }, [showAdditionalImages]);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.opacity = 1;
    }
  }, [currentImage]);

  return (
    <>
      {isAuthenticated && (<div className="main-page">
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
            onClick={handleThirdImageClick}
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
              />
            </div>
          </div>
        )}
      </div>)}
    </>
  );
}

export default AsideButton;
