import React, { useState, useEffect, useRef } from "react";
import "/src/css/slider.css";
function ImageSlider() {
  const slideImages = [
    "./src/images/slideImage1.jpg",
    "./src/images/slideImage3.jpg",
    "./src/images/slideimage4.jpg",
    "./src/images/slideImage2.jpg",
  ];
  const images = [
    "./src/images/slideImage1mini.png",
    "./src/images/slideImage3mini.png",
    "./src/images/slideimage4mini.png",
    "./src/images/slideImage2mini.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null); // 인터벌 ID를 저장할 ref

  useEffect(() => {
    startSlider();

    return () => clearInterval(intervalRef.current);
  }, []);

  const startSlider = () => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 3000);
  };

  const stopSlider = () => {
    clearInterval(intervalRef.current);
  };

  const handleThumbnailEnter = (index) => {
    setCurrentImageIndex(index);
    stopSlider(); // 썸네일 호버 시 슬라이더 정지
  };

  const handleSliderMouseEnter = () => {
    stopSlider(); // 슬라이더 영역 진입 시 슬라이더 정지
  };

  const handleSliderMouseLeave = () => {
    startSlider(); // 슬라이더 영역 벗어나면 슬라이더 재개
  };

  return (
    <div
      className="image-slider"
      onMouseEnter={handleSliderMouseEnter}
      onMouseLeave={handleSliderMouseLeave}
    >
      <div
        className="slide"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {slideImages.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
      <div className="thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onMouseEnter={() => handleThumbnailEnter(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
