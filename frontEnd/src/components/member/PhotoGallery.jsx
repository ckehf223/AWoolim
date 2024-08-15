import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "/src/css/member/photogallery.css";
import instance from "/src/common/auth/axios";
import imageCompression from "browser-image-compression";
import { useAuth } from "/src/common/AuthContext";

const PhotoGallery = () => {
  const param = useParams();
  const { loginId } = useAuth();
  const [photos, setPhotos] = useState([]);
  const photosPerRow = 4;
  const [deleteState, setDeleteState] = useState({});
  const [managerId, setManagerId] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    fetchPhotos();
    clubMasterId();
  }, [param.no]);

  const fetchPhotos = async () => {
    try {
      const response = await instance.get(`/api/photoGallery/${param.no}`);
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const clubMasterId = async () => {
    try {
      const response = await instance.get(`/api/club/clubMasterId/${param.no}`);
      setManagerId(response.data);
    } catch (error) {
      console.error("모임장 아이디 가져오는 중 오류 발생" + error);
    }
  };

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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("이미지 리사이즈 실패:", error);
      }
    }
  };

  const toggleDeleteState = (index) => {
    setDeleteState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const deletePhoto = async (picNo) => {
    try {
      await instance.post(`/api/photoGallery/deletePhoto/${picNo}`);
      fetchPhotos();
    } catch (error) {
      console.error("모임 사진첩 사진 삭제 중 오류발생" + error);
    }
  };

  return (
    <section className="section-container2">
      <div className="button-group">
        <button
          onClick={() => {
            nav(`/includeclub/detailInfo/${param.no}`);
          }}
        >
          상세 정보
        </button>
        <button
          onClick={() => {
            nav(`/includeclub/calendar/${param.no}`);
          }}
        >
          캘린더{" "}
        </button>
        <button
          className={"active"}
          onClick={() => {
            nav(`/includeclub/photoGallery/${param.no}`);
          }}
        >
          {" "}
          사진첩{" "}
        </button>
      </div>
      <div className="content">
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
                    className="ClubPhotoImage"
                    src={photo.image ? photo.image : photo} // 실제 파일이 저장된 경로로 변경
                    alt={`Photo ${index}`}
                  />
                  {(loginId === managerId || loginId === photo.userId) && (
                    <div className="photoDeleteArea">
                      {!deleteState[index] ? (
                        <img
                          className="photoDeleteImage"
                          src="/src/assets/images/delete.png"
                          onClick={() => toggleDeleteState(index)}
                          alt="Delete Icon"
                        />
                      ) : (
                        <>
                          <img
                            className="photoDeleteImage"
                            src="/src/assets/images/close.png"
                            alt="Close Icon"
                            onClick={() => toggleDeleteState(index)}
                          />
                          <button
                            className="deleteImageCheckButton"
                            onClick={() => {
                              deletePhoto(photo.picNo);
                            }}
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default PhotoGallery;
