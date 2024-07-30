import React, { useState } from "react";
import "/src/css/photogallery.css";

function PhotoGallery() {
  const [photos, setPhotos] = useState([
    "./src/images/slideImg1.png",
    "./src/images/slideImg2.png",
    "./src/images/slideImg3.png",
    "./src/images/slideImg4.png",
  ]);

  const handleAddPhoto = (newPhoto) => {
    setPhotos((prevPhotos) => {
      const newPhotos = [newPhoto, ...prevPhotos];
      // 4개씩 나누어 배치하기 위해 새로운 배열 생성
      const rearrangedPhotos = [];
      while (newPhotos.length > 0) {
        rearrangedPhotos.push(newPhotos.splice(0, 4));
      }
      return rearrangedPhotos.flat(); // 다시 1차원 배열로 변환
    });
  };

  return (
    <section className="photo-gallery">
      {/* 사진 업로드 버튼 또는 입력 필드 (구현 필요) */}
      <button onClick={() => handleAddPhoto("new-photo-url")}>
        사진 추가 (임시)
      </button>

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo} alt={`Photo ${index}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PhotoGallery;
