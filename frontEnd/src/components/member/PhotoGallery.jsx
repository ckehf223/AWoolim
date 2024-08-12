import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "/src/css/member/photogallery.css";
import instance from "/src/common/auth/axios";
import imageCompression from "browser-image-compression";

function PhotoGallery() {
  const param = useParams(); // URL 파라미터에서 클럽 번호 가져오기
  const [photos, setPhotos] = useState([]); // 초기 상태를 빈 배열로 설정
  const photosPerRow = 4;

  console.log(param.no);
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await instance.get(
          `http://localhost:8080/api/photoGallery/${param.no}`
        );
        setPhotos(response.data); // 서버에서 가져온 사진 리스트로 상태 업데이트
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };
    fetchPhotos();
  }, [param.no]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log(file.name);
    if (file && file.type.startsWith("image/")) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        console.log(compressedFile.name);
        const formData = new FormData();
        const reader = new FileReader();

        reader.onload = (e) => {
          setPhotos((prevPhotos) => [e.target.result, ...prevPhotos]);
        };
        formData.append("clubno", param.no);
        formData.append("file", compressedFile, compressedFile.name);

        await instance.post("/api/photoGallery/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("이미지 리사이즈 실패:", error);
      }
    }
  };

  return (
    <section className="photo-gallery">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "20px" }}
      />

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <React.Fragment key={index}>
            {index > 0 && index % photosPerRow === 0 && <br />}
            <div className="photo-item">
              <img
                src={photo.image ? photo.image : photo} // 실제 파일이 저장된 경로로 변경
                alt={`Photo ${index}`}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default PhotoGallery;
