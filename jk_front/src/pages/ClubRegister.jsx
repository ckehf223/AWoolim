import { useState } from "react";

const ClubRegister = () => {
  const [type, setType] = useState('hidden');
  const [message, setMessage] = useState('');
  const [dayValue, setDayValue] = useState('');
  const [regularyType, setRegularyType] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (buttonId) => {
    setSelectedButton(buttonId);
    setRegularyType(buttonId);
    if (buttonId === 0) {
      setType('date');
      setMessage('만나는 날');
    } else {
      setType('text');
      setMessage('모임 주기');
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
          <div className="ClubRegisterTopArea">
            <div>
              <input type="file" />
            </div>
            {/* <img src="/src/images/chicago.webp" /> */}
            <div className="">
              <label htmlFor="ClubName" className="ClubName">모임명</label>
              <input type="text" name="ClubName" />
              <label htmlFor="ClubCategory">카테고리</label>
              <select>
                <option defaultValue={""}>선택하세요</option>
                <option value="야외스포츠">야외스포츠</option>
                <option value="실내스포츠">실내스포츠</option>
                <option value="봉사활동">봉사활동</option>
                <option value="스터디">스터디</option>
                <option value="파티">파티</option>
                <option value="공연">공연</option>
                <option value="친목">친목</option>
              </select>
            </div>
            <div className="">
              <div className="ClubRegisterChoice">
                <button className="daySelect" style={selectedButton === 0 ? buttonStyles.selected : buttonStyles.default} onClick={() => { handleClick(0) }}>일회성</button>
                <button className="daySelect" style={selectedButton === 1 ? buttonStyles.selected : buttonStyles.default} onClick={() => { handleClick(1) }}>정기모임</button>
                <label htmlFor="">{message}</label><input type={type} name="regularyType" value={dayValue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default ClubRegister;