import axios from "axios";
import { useEffect, useState } from "react";
import '/src/css/member/sign/FindbyId.css'
import { useNavigate } from "react-router-dom";
const FindbyId = () => {
  const nav = useNavigate();
  const [timeLeft, setTimeLeft] = useState(180);
  const [isActive, setIsActive] = useState(false);
  const [userPhoneError, setUserPhoneError] = useState(null);
  const [phoneCheckMessage, setPhoneCheckMessage] = useState('');
  const [isPhoneSuccess, setIsPhoneSuccess] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userPhoneCheck, setUserPhoneCheck] = useState('');
  const [userId, setUserId] = useState('');
  const handleButtonClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/send-sms', {
        phoneNumber: userPhone,
        message: "Hello!"
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (response.status === 200) {
        setTimeLeft(180);
        setIsActive(true);
        setUserPhoneError('인증번호가 전송되었습니다.');
      }
    } catch (error) {
      setUserPhoneError('인증번호 전송에 실패했습니다.');
      console.log("인증번호 전송 오류: " + error);
    }
  };

  const changePhoneNumber = (e) => {
    setUserPhone(e.target.value);
  };
  const changePhoneCheck = (e) => {
    setUserPhoneCheck(e.target.value);
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  const handleCodeCheck = async () => {
    try {
      await axios.post('http://localhost:8080/check-code',
        {
          code: userPhoneCheck,
          phoneNumber: userPhone
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then(response => {
          if (response.status === 200) {
            if (response.data === 0) {
              setIsPhoneSuccess(true);
              axios.post('http://localhost:8080/member/getMemberByPhone',
                {
                  phoneNumber: userPhone
                },
                {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true,
                }
              )
                .then(response => {
                  if (response.status === 200 && response.data !== null && response.data.snsType === 'default') {
                    setUserId(response.data.userEmail);
                  } else {
                    setUserId('가입하신 정보가 없습니다.')
                  }
                }).catch(error => {
                  console.log(error);
                })
              setPhoneCheckMessage('');
              setUserPhoneError('')
              setIsActive(false);
              setIsPhoneSuccess(true)
            } else {
              setUserPhoneError('인증 번호를 확인해주세요')
              setUserPhoneCheck('');
            }
          }
        })
    } catch (error) {
      setPhoneCheckMessage('인증번호 확인에 실패했습니다.');
    }
  };
  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setUserPhoneError('인증시간이 만료되었습니다.');
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);
  return (
    <>
      <div className="findIdWrap">
        <h3>아이디 찾기</h3>
        <div className="FindByIdArea">
          {!isPhoneSuccess && (<div className="FindByIdBox">
            <div className="RegisterMemberInputBox">
              <div className='RegisterMemberInputArea'>
                <label htmlFor="userphoneInput"><span className='InputStarSpan'>*</span> 휴대폰 번호</label>
                <input type="text" id="userphoneInput" name="userphone" value={userPhone} onChange={changePhoneNumber} required />
                <button type="button" className='RegisterMemberPhoneCheckButton' onClick={handleButtonClick}>인증번호 전송</button>
              </div>
              <div className='RegisterMemberErrorArea'>
                {userPhoneError && <span className="error">{userPhoneError}</span>}
              </div>
            </div>
            <div className="RegisterMemberInputBox">
              {isActive && <div className='RegisterMemberInputArea'>
                <label htmlFor="phoneCheck"><span className='InputStarSpan'>*</span> 인증번호</label>
                <input type="text" id="phoneCheck" name="phoneCheckCode" value={userPhoneCheck} onChange={changePhoneCheck} />
                <span className='phoneCheckTimer'>{formatTime(timeLeft)}</span>
                <button type="button" className='RegisterMemberPhoneCheckButton' onClick={handleCodeCheck}>인증번호 확인</button>
              </div>
              }
              <div className='RegisterMemberErrorArea'>
                {isPhoneSuccess && <span className="error" id='phoneCheckMessage'>{phoneCheckMessage}</span>}
              </div>
            </div>
          </div>)}
          {isPhoneSuccess && <div className="RegisterMemberInputBox">
            <div className='RegisterMemberInputArea'>
              <label htmlFor="successCheck">아이디</label>
              <input type="text" name="successCheck" value={userId} readOnly disabled />
            </div>
          </div>}
        </div>
        <div className="FindByIdButtonArea">
          <button className="FindByPasswordMoveButton" onClick={() => { nav(`/findbypw`) }}>비밀번호 찾기</button>
          <button className="FindByIdCloseButton" onClick={() => { window.close() }}>닫기</button>
        </div>
      </div>
    </>

  )
}
export default FindbyId;