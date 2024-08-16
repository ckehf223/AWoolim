import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";

const FindbyPw = () => {
  const nav = useNavigate();
  const [timeLeft, setTimeLeft] = useState(180);
  const [isActive, setIsActive] = useState(false);
  const [userPhoneError, setUserPhoneError] = useState(null);
  const [phoneCheckMessage, setPhoneCheckMessage] = useState('');
  const [isPhoneSuccess, setIsPhoneSuccess] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userPhoneCheck, setUserPhoneCheck] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userEmailError, setUserEmailError] = useState('');
  const [userEmailCheck, setUserEmailCheck] = useState(false);
  const [newPw, setNewPw] = useState('');
  const [newPwCheck, setNewPwCheck] = useState('');

  const [newPwError, setNewPwError] = useState('');
  const [pwCheckError, setPwCheckError] = useState('');
  const [isPwCheck, setIsPwCheck] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);

  const changePhoneNumber = (e) => {
    setUserPhone(e.target.value);
  };
  const changePhoneCheck = (e) => {
    setUserPhoneCheck(e.target.value);
  }
  const onChangeEmail = (e) => {
    setUserEmail(e.target.value);
  }
  const onChangePw = (e) => {
    setNewPw(e.target.value);
  }
  const onChangePwCheck = (e) => {
    setNewPwCheck(e.target.value);
  }
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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


  const handleEmailCheck = async () => {
    try {
      if (userEmailCheck) {
        return;
      }
      if (userEmail === '' || userEmail === null) {
        setUserEmailError('이메일을 입력해주세요');
        return;
      } else {
        await axios.get(`http://localhost:8080/member/checkEmail/${userEmail}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        ).then(response => {
          if (response.status === 200) {
            if (response.data) {
              setUserEmailCheck(true);
              setUserEmailError('이메일 정보가 확인되었습니다.')
            } else {
              setUserEmailError('이메일 정보를 확인해 주세요');
              setUserEmail('');
            }
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleButtonClick = async () => {
    try {
      if (!userEmailCheck) {
        setUserPhoneError('이메일 확인 후 이용가능합니다.');
        return;
      }
      if (userPhone === '' || userPhone === null) {
        setUserPhoneError('휴대폰 번호를 입력해주세요');
        return;

      } else {
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
      }
    } catch (error) {
      setUserPhoneError('인증번호 전송에 실패했습니다.');
      console.log("인증번호 전송 오류: " + error);
    }
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

  const validatePasswordPatten = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
    if (!passwordRegex.test(newPw)) {
      setNewPwError('비밀번호는 8~12자 영문, 숫자, 특수문자 혼합이어야 합니다.');
    } else {
      setNewPwError('');
    }
  }
  const validatePasswordMatch = () => {
    if (newPw !== newPwCheck) {
      setPwCheckError('비밀번호가 일치하지 않습니다.');
    } else {
      setPwCheckError('');
      setIsPwCheck(true);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordCheckVisibility = () => {
    setPasswordCheckVisible(!passwordCheckVisible);
  };

  const updatePwHandler = async () => {
    if (isPwCheck && newPwError === '') {
      await axios.put('http://localhost:8080/member/updatePassword', {
        userEmail: userEmail,
        newPassword: newPw
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }).then(response => {
        if (response.status === 200) {
          if (response.data === 'success') {
            alert('비밀번호 변경이 완료되었습니다.');
            window.close();
          } else {
            alert('비밀번호 변경이 완료되지 않았습니다.');
          }
        }
      }).catch(error => {
        alert('비밀번호 변경이 완료되지 않았습니다.');
        console.log(error);
      })
    }
  }



  return (
    <>
      <div className="findIdWrap">
        {isPhoneSuccess ? (<h3>비밀번호 재설정</h3>) : (<h3>비밀번호 찾기</h3>)}
        <div className="FindByIdArea">
          {!isPhoneSuccess && <div>
            <div className="RegisterMemberInputBox">
              <div className='RegisterMemberInputArea'>
                <label htmlFor="useremail"> 이메일</label>
                <input type="email" id="userphoneInput" name="useremail" value={userEmail} onChange={onChangeEmail} />
                <button type="button" className='RegisterMemberPhoneCheckButton' onClick={handleEmailCheck}>이메일 확인</button>
              </div>
              <div className='RegisterMemberErrorArea'>
                {!userEmailCheck && <span className="error">{userEmailError}</span>}
                {userEmailCheck && <span className="success">{userEmailError}</span>}
              </div>
            </div>
            <div className="FindByIdBox">
              <div className="RegisterMemberInputBox">
                <div className='RegisterMemberInputArea'>
                  <label htmlFor="userphoneInput"> 휴대폰 번호</label>
                  <input type="text" id="userphoneInput" name="userphone" value={userPhone} onChange={changePhoneNumber} />
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
                  {phoneCheckMessage && <span className="error" id='phoneCheckMessage'>{phoneCheckMessage}</span>}
                </div>
              </div>
            </div>
          </div>}
          {isPhoneSuccess &&
            <div>
              <div className="RegisterMemberInputBox">
                <div className='RegisterMemberInputArea'>
                  <label htmlFor="password">새 비밀번호 </label>
                  <input type={passwordVisible ? "text" : "password"} name="password" value={newPw}
                    onChange={onChangePw} onBlur={validatePasswordPatten} placeholder='8~12자 영문,숫자,특수문자 혼합입니다.' />
                  <span className="password-toggle" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon className='EyeSlashIcon' icon={passwordVisible ? faEyeSlash : faEye} />
                  </span>
                </div>
                <div className='RegisterMemberErrorArea'>
                  {newPwError && <span className='error' style={{ width: "24%", maginRight: "5px" }}>{newPwError}</span>}
                </div>
              </div>
              <div className="RegisterMemberInputBox">
                <div className='RegisterMemberInputArea'>
                  <label htmlFor="passwordCheck">새 비밀번호 확인</label>
                  <input type={passwordCheckVisible ? "text" : "password"} name="passwordCheck" value={newPwCheck}
                    onChange={onChangePwCheck} onBlur={validatePasswordMatch} required />
                  <span className="password-toggle" onClick={togglePasswordCheckVisibility}>
                    <FontAwesomeIcon className='EyeSlashIcon' icon={passwordCheckVisible ? faEyeSlash : faEye} />
                  </span>
                </div>
                <div className='RegisterMemberErrorArea'>
                  {pwCheckError && <span className='error' style={{ width: "24%", maginRight: "5px" }}>{pwCheckError}</span>}
                </div>
              </div>
            </div>
          }
        </div>
        {!isPhoneSuccess ? (<div className="FindByIdButtonArea">
          <button className="FindByPasswordMoveButton" onClick={() => { nav('/findbyid') }}>아이디 찾기</button>
          <button className="FindByIdCloseButton" onClick={() => { window.close() }}>닫기</button>
        </div>) : (
          <div className="FindByIdButtonArea">
            <button className="FindByPasswordMoveButton" onClick={updatePwHandler}>변경</button>
            <button className="FindByIdCloseButton" onClick={() => { window.close() }}>닫기</button>
          </div>
        )}

      </div >
    </>

  )
}
export default FindbyPw;