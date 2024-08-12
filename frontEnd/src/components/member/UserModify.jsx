import { useEffect, useState } from 'react';
import '/src/css/member/UserModify.css'
import { useNavigate } from 'react-router-dom';
import instance from '/src/common/auth/axios';
import { useAuth } from "/src/common/AuthContext";
import axios from 'axios';

const UserModify = () => {
  const { logout, isAuthenticated } = useAuth();
  const nav = useNavigate();
  const [userData, setUserData] = useState('');
  const [formValues, setFormValues] = useState({
    userEmail: '',
    userPhone: '',
    phoneCheckCode: '',
    password: '',
    passwordCheck: '',
  })

  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const [emailSuccess, setEmailSuccess] = useState(false);
  const [phoneSuccess, setPhonesuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [userEmailError, setUserEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [userPhoneError, setUserPhoneError] = useState('');
  const [phoneCheckMessage, setPhoneCheckMessage] = useState('');
  const [userEmailSuccess, setUserEmailSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await instance.get('http://localhost:8080/member/readUser', {
          headers: { 'Content-Type': 'application/json' }
        })
        setUserData(response.data);
      } catch (error) {
        console.error("마이페이지 유저 정보 로딩 중 오류" + error);
      }
    }
    getUser();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleButtonClick = async () => {
    try {
      await axios.post('http://localhost:8080/send-sms', {
        phoneNumber: formValues.userPhone,
        message: "Hello!"
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      setTimeLeft(180);
      setIsActive(true);
      setUserPhoneError('인증번호가 전송되었습니다.');
    } catch (error) {
      setUserPhoneError('인증번호 전송에 실패했습니다.');
      console.log("인증번호 전송 오류: " + error);
    }
  };
  const handleCodeCheck = async () => {
    try {
      await axios.post('http://localhost:8080/check-code',
        {
          code: formValues.phoneCheckCode,
          phoneNumber: formValues.userPhone
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then(response => {
          if (response.status === 200) {
            if (response.data === 1) {
              setPhonesuccess(true);
              setPhoneCheckMessage('인증되었습니다.');
              setUserPhoneError('')
              setIsActive(false);
            } else if (response.data === 0) {
              alert('이미 가입한 전화번호 입니다.');
              setIsActive(false);
            } else {
              setUserPhoneError('인증 번호를 확인해주세요')
            }
          }
        })
    } catch (error) {
      setPhoneCheckMessage('인증번호 확인에 실패했습니다.');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const validateEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.userEmail)) {
      setUserEmailError('유효하지 않은 이메일 주소입니다.');
      setUserEmailSuccess('')
    } else {
      try {
        const response = await axios.post('http://localhost:8080/member/checkEmail', { userEmail: formValues.userEmail },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          if (response.data) {
            setUserEmailError('중복된 아이디입니다.');
            setUserEmailSuccess('')
          } else {
            setUserEmailSuccess('사용가능한 아이디입니다.');
            setUserEmailError('')
            setEmailSuccess(true);
          }
        }
      } catch (error) {
        console.log("이메일 중복체크 에러: " + error);
      }
    }
  };

  const validatePasswordPatten = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
    if (!passwordRegex.test(formValues.password)) {
      setPasswordError('비밀번호는 8~12자 영문, 숫자, 특수문자 혼합이어야 합니다.');
    } else {
      setPasswordError('');
    }
  }

  const validatePasswordMatch = () => {
    if (formValues.password !== formValues.passwordCheck) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordCheckError('');
      setPasswordSuccess(true);
    }
  };
  const cancelHandler = () => {
    setIsPassword(false);
    formValues.password = '';
    formValues.passwordCheck = ''
    setPasswordError('');
    setPasswordCheckError('');
  };

  const updateUser = async () => {
    if (formValues.userEmail === '' && formValues.password === '' && !formValues.userPhone === '') {
      alert('변경된 정보가 없습니다.');
    } else if ((isEmail !== emailSuccess) || (isPassword !== passwordSuccess) || passwordError !== '' || passwordCheckError !== '' || (isPhone !== phoneSuccess)) {
      alert('변경 전 유효성 검사는 필수입니다, \n 확인 후 재 요청 부탁드립니다.');
    } else {
      try {
        await instance.post('http://localhost:8080/member/modifyMember',
          {
            userEmail: formValues.userEmail,
            password: formValues.password,
            userPhone: formValues.userPhone
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        alert('회원 정보가 수정되었습니다.\n 정보가 변경되어 로그아웃 됩니다.');
        logout();
      } catch (error) {
        console.error("회원정보 수정 중 오류발생" + error);
        alert('회원 정보 수정 처리중 오류가 발생하였습니다. \n 잠시후 다시 시도해주세요.');
      }
    }
  }

  return (
    <>
      <div className='UserModify'>
        <div className='UserModifyWrap'>
          <div className='UserModifyContentBorder'>
            <div className='UserModifyTitle'>
              <h4>회원 정보 수정</h4>
            </div>
          </div>
          <div className='UserModifyMainArea'>

            {!isEmail ? (
              <div className='UserModifyUnitBox'>
                <div>아이디</div>
                <input type="text" value={userData.userEmail} readOnly />
                {userData.snsType === 'default' && <button className='UserModifyButton' onClick={() => { setIsEmail(true); }}>변경</button>}
              </div>
            ) : (
              <div className='UserModifyUnitBox'>
                <div>아이디</div>
                <input type="text" name='userEmail' value={formValues.userEmail} onChange={handleChange} />
                <button className='UserModifyButton' onClick={() => { validateEmail() }}>중복확인</button>
              </div>
            )}
            <div className='UserModifyErrorArea'>
              {userEmailError && <span className="UserModifyError">{userEmailError}</span>}
              {userEmailSuccess && <span className="UserModifySuccess">{userEmailSuccess}</span>}
            </div>
            {userData.snsType === 'default' &&
              <div>
                {!isPassword ? (
                  <div className='UserModifyUnitBox'>
                    <div>패스워드</div>
                    <input type="password" value={'asdasdasdasdasdasd'} readOnly />
                    <button className='UserModifyButton' onClick={() => { setIsPassword(true) }}>변경</button>
                  </div>
                ) : (
                  <div className='UserModifyPassword'>
                    <div className='UserModifyUnitBox'>
                      <div>패스워드 변경</div>
                      <input type="password" name='password' onChange={handleChange} onBlur={validatePasswordPatten} value={formValues.password} placeholder='새 비밀번호' />
                      <button className='UserModifyButton' onClick={() => { cancelHandler() }}>취소</button>
                    </div>
                    <div className='UserModifyErrorArea'>
                      {passwordError && <span className="UserModifyError">{passwordError}</span>}
                    </div>
                    <div className='UserModifyUnitBox'>
                      <div>패스워드 확인</div>
                      <input type="password" name='passwordCheck' value={formValues.passwordCheck} onChange={handleChange} onBlur={validatePasswordMatch} placeholder='비밀번호 확인' />
                    </div>
                    <div className='UserModifyErrorArea'>
                      {passwordCheckError && <span className="UserModifyError">{passwordCheckError}</span>}
                    </div>
                  </div>
                )}
              </div>}
            {/* 회원가입 타입에 따라 안보여줄 예정 */}

            <div className='UserModifyUnitBox'>
              <div>이름</div>
              <input type="text" value={userData.userName} disabled />
            </div>
            <div className='UserModifyUnitBox'>
              <div>생년월일</div>
              <input type="text" value={userData.userBirth} disabled />
            </div>
            {!isPhone ? (
              <div className='UserModifyUnitBox'>
                <div>전화번호</div>
                <input type="text" value={userData.userPhone} disabled />
                <button className='UserModifyButton' onClick={() => { setIsPhone(true) }}>변경</button>
              </div>
            ) : (
              <div className='UserModifyUnitBox'>
                <div >전화번호</div>
                <input type="text" name='userPhone' value={formValues.userPhone} onChange={handleChange} />
                <button className='UserModifyButton' onClick={handleButtonClick} >인증번호 전송</button>
              </div>
            )}
            <div className='UserModifyErrorArea'>
              {userPhoneError && <span className="UserModifyError" >{userPhoneError}</span>}
            </div>
            {isActive &&
              <div className='UserModifyUnitBox'>
                <div>인증번호</div>
                <input type="text" name="phoneCheckCode" value={formValues.phoneCheckCode} onChange={handleChange} />
                <span className='phoneCheckTimer'>{formatTime(timeLeft)}</span>
                <button className='UserModifyButton' onClick={handleCodeCheck}>인증번호 확인</button>
              </div>
            }
            <div className='UserModifyErrorArea'>
              {phoneSuccess && <span className="UserModifySuccess">{phoneCheckMessage}</span>}
              {!phoneSuccess && <span className="UserModifyError">{phoneCheckMessage}</span>}
            </div>
            <div className='UserModifyButtonArea'>
              <button className='UserModifyUpdateButton' onClick={() => { updateUser() }}>정보 수정</button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
export default UserModify;