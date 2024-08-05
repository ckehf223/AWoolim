import React, { useState, useEffect } from "react";
import "/src/css/member/photogallery.css";

function PhotoGallery() {
  const initialPhotos = [
    "/src/assets/images/slideImg1.png",
    "/src/assets/images/slideImg2.png",
    "/src/assets/images/slideImg3.png",
    "/src/assets/images/slideImg4.png",
  ]; // 데이터베이스 역할

  const [photos, setPhotos] = useState(initialPhotos); // 초기 상태를 initialPhotos로 설정
  const photosPerRow = 4;

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지 초기화 (선택 사항)
    localStorage.removeItem("photos");
    // 로컬 스토리지에서 데이터 불러오기 (없으면 빈 배열)
    const storedPhotos = JSON.parse(localStorage.getItem("photos")) || [];

    // 로컬 스토리지 데이터와 초기 데이터 합치기
    const combinedPhotos = [...initialPhotos, ...storedPhotos];

    // 중복 제거 (선택 사항)
    const uniquePhotos = Array.from(new Set(combinedPhotos));

    setPhotos(uniquePhotos); // 상태 업데이트
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleAddPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (newPhoto) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = [newPhoto, ...prevPhotos];
      localStorage.setItem("photos", JSON.stringify(updatedPhotos));
      return updatedPhotos;
    });
  };

  return (
    <section className="photo-gallery">
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <React.Fragment key={index}>
            {index > 0 && index % photosPerRow === 0 && <br />}
            <div className="photo-item">
              <img src={photo} alt={`Photo ${index}`} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default PhotoGallery;
