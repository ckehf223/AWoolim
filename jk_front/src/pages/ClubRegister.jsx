import { useMemo, useState } from "react";
import './ClubRegister.css'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { CustomToolbar } from "../components/CustomToolbar";
const ClubRegister = () => {
  const [type, setType] = useState('hidden');
  const [message, setMessage] = useState('');
  const [dayValue, setDayValue] = useState('');
  const [regularyType, setRegularyType] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [fileInput, setFileInput] = useState('');
  const [imageSrc, setImageSrc] = useState('/src/images/image.png');

  //react-quill 라이브러리 사용
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
      },
    };
  }, []);

  const area = [
    '서울특별시', '부산광역시', '대구광역시',
    '인천광역시', '광주광역시', '대전광역시',
    '울산광역시', '세종특별자치시', '경기도',
    '강원도', '충청북도', '충청남도',
    '경상북도', '경상남도', '전라북도',
    '전라남도', '제주특별자치도'
  ]

  //이미지 미리보기 
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      setFileInput(file.name);
      reader.readAsDataURL(file);
    } else {
      setImageSrc('/src/images/image.png');
    }
  };


  //input값 업데이트
  const onSetInput = function (e) {
    setDayValue(e.target.value);
  };

  const handleClick = (buttonId) => {
    setSelectedButton(buttonId);
    setRegularyType(buttonId);
    if (buttonId === 0) {
      setType('date');
      setMessage('만나는 날');
      setDayValue('');
    } else {
      setType('text');
      setMessage('모임 주기');
      setDayValue('');
    }
    console.log(message);
  };


  const buttonStyles = {
    default: { backgroundColor: 'white', color: 'black' },
    selected: { backgroundColor: 'black', color: 'white' },
  };


  return (
    <>
      <div className="ClubRegister">
        <div className="ClubRegisterWrap">
          <div className="ClubRegisterHeader">
            <h2>모임 개설</h2>
          </div>
          <div className="ClubRegisterTopArea">
            <div className="ClubRegisterTopBox">
              <div className="fileBox">
                <h3>모임 프로필 사진</h3>
                <div className="preview">
                  {imageSrc && <img src={imageSrc} alt="미리보기" />}
                </div>
                <input className="upload-name" value={fileInput} onChange={handleImageChange} placeholder="첨부파일" />
                <label htmlFor="imageUpload">파일찾기</label>
                <input type="file" id="imageUpload" accept=".jpg, .jpeg, .png, .gif, .webp" onChange={handleImageChange} />
              </div>
              <div className="ClubRegisterNcBox">
                <div className="ClubRegisterNameBox">
                  <label htmlFor="ClubName">모임명</label>
                  <input type="text" name="ClubName" id="ClubName" />
                </div>
                <div className="ClubCategoryBox">
                  <label htmlFor="ClubCategory">카테고리</label>
                  <select>
                    <option defaultValue={""} defaultChecked>선택하세요</option>
                    <option value="야외스포츠">야외스포츠</option>
                    <option value="실내스포츠">실내스포츠</option>
                    <option value="봉사활동">봉사활동</option>
                    <option value="스터디">스터디</option>
                    <option value="파티">파티</option>
                    <option value="공연">공연</option>
                    <option value="친목">친목</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="ClubRegisterChoiceArea">
              <div className="ClubRegisterChoice">
                <button className="daySelect" style={selectedButton === 0 ? buttonStyles.selected : buttonStyles.default} onClick={() => { handleClick(0) }}>일회성</button>
                <button className="daySelect" style={selectedButton === 1 ? buttonStyles.selected : buttonStyles.default} onClick={() => { handleClick(1) }}>정기모임</button>
              </div>
              <div className="ClubRegisterChoiceSection">
                <div className="choiceBoxArea">
                  <div className="choiceBox">
                    <label htmlFor="">{message}</label>
                    <input type={type} name="regularyType" value={dayValue} onChange={onSetInput} />
                  </div>
                  <div className="choiceBox">
                    <label htmlFor="">정원</label>
                    <input type="text" />
                  </div>
                  <div className="choiceBox">
                    <label htmlFor="">모집 성별</label>
                    <input type="text" />
                  </div>
                  <div className="choiceBox">
                    <label htmlFor="">모집 나이</label>
                    <input type="text" />
                  </div>
                  <div className="choiceBox">
                    <label htmlFor="">지역</label>
                    <input type="text" readOnly />
                  </div>
                </div>
                <div className="venueBox">
                  <h3>지역 선택</h3>
                  <div className="venueChoice">
                    <div className="venueChoiceLocal">
                      <ul>
                        <li id="abcde">서울</li>
                        <li>인천/경기</li>
                        <li>대구광역시</li>
                        <li>인천광역시</li>
                        <li>광주광역시</li>
                        <li>대전광역시</li>
                        <li>울산광역시</li>
                        <li>세종특별자치시</li>
                        <li>경기도</li>
                        <li>강원도</li>
                        <li>충청북도</li>
                        <li>충청남도</li>
                        <li>경상북도</li>
                        <li>경상남도</li>
                        <li>전라북도</li>
                        <li>전라남도</li>
                        <li>제주도</li>
                      </ul>
                    </div>
                    <div className="venueChoiceCity">
                      <ul>
                        <li>전체</li>
                        <li>강남구</li>
                        <li>강동구</li>
                        <li>강북구</li>
                        <li>강서구</li>
                        <li>관악구</li>
                        <li>광진구</li>
                        <li>구로구</li>
                        <li>금천구</li>
                        <li>노원구</li>
                        <li>도봉구</li>
                        <li>동대문구</li>
                        <li>동작구</li>
                        <li>마포구</li>
                        <li>서대문구</li>
                        <li>서초구</li>
                        <li>성동구</li>
                        <li>성북구</li>
                        <li>송파구</li>
                        <li>양천구</li>
                        <li>영등포구</li>
                        <li>용산구</li>
                        <li>은평구</li>
                        <li>종로구</li>
                        <li>중구</li>
                        <li>중랑구</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ClubRegisterSection">
            <h3>상세 정보</h3>
            <ReactQuill style={{ width: "1000px", height: "300px" }} />
            {/* <div><textarea name="" id=""></textarea></div> */}
          </div>
          <div className="ClubRegisterButtonArea">
            <button className="registerButton">등록</button>
            <button className="cancelButton">취소</button>
          </div>
        </div>
      </div >
    </>

  )
}

export default ClubRegister;