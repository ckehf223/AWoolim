import React, { useState, useContext } from 'react';
import '/src/css/member/RegisterMember.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const RegisterMember = () => {
    const { users, addUser } = useContext('');
    const [formData, setFormData] = useState({
        useremail: '',
        password: '',
        passwordCheck: '',
        username: '',
        usergender: '',
        userbirth: '',
        userphone: '',
        nickname: ''
    });
    const [userEmailError, setUserEmailError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [userPhoneError, setUserPhoneError] = useState('');
    const navi = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userEmailError && !userNameError && !passwordError) {
            addUser({
                useremail: formData.useremail,
                password: formData.password,
                username: formData.username,
                usergender: formData.usergender,
                userbirth: formData.userbirth,
                userphone: formData.userphone,
                nickname: formData.nickname
            });
            alert(`${formData.username}님, 환영합니다.`);
            navi('/login')
            console.log('회원가입정보 : ', formData);
        } else {
            alert('입력된 정보를 확인해보세요');
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.useremail)) {
            setUserEmailError('유효하지 않은 이메일 주소입니다.');
        } else {
            setUserEmailError('');
        }
    };

    const validatePasswordPatten = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
        if (!passwordRegex.test(formData.password)) {
            setPasswordError('비밀번호는 8~12자 영문, 숫자, 특수문자 혼합이어야 합니다.');
        } else {
            setPasswordError('');
        }
    }

    const validatePasswordMatch = () => {
        if (formData.password !== formData.passwordCheck) {
            setPasswordCheckError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordCheckError('');
        }
    };

    const validateUserNamePatten = () => {
        const userNamedRegex = /^[가-힣]{2,7}$/;
        if (!userNamedRegex.test(formData.username)) {
            setUserNameError('이름은 한글 2~7자 입니다.');
        } else {
            setUserNameError('');
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const togglePasswordCheckVisibility = () => {
        setPasswordCheckVisible(!passwordCheckVisible);
    };

    return (
        <div className="RegisterMember">
            <h2>회원 가입</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="input-group2">
                    <label htmlFor="useremail">이메일 *</label>
                    <input type="email" id="useremail" name="useremail" value={formData.useremail} placeholder='이메일 형식에 맞게 작성하세요.'
                        onChange={handleChange} onBlur={validateEmail} required />
                    {userEmailError && <span className="error" style={{ width: "25%", marginRight: "5px" }}>{userEmailError}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">비밀번호 *</label>
                    <div className='pw-group'>
                        <input type={passwordVisible ? "text" : "password"} id="password" name="password" value={formData.password}
                            onChange={handleChange} onBlur={validatePasswordPatten} required placeholder='8~12자 영문,숫자,특수문자 혼합입니다.' />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} style={{ fontSize: "18px", cursor: "pointer", marginTop: "10px" }} />
                        </span>
                    </div>
                    {passwordError && <span className='error'>{passwordError}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="passwordCheck">비밀번호 확인 *</label>
                    <div className='pw-group'>
                        <input type={passwordCheckVisible ? "text" : "password"} id="passwordCheck" name="passwordCheck" value={formData.passwordCheck}
                            onChange={handleChange} onBlur={validatePasswordMatch} required />
                        <span className="password-toggle" onClick={togglePasswordCheckVisibility}>
                            <FontAwesomeIcon icon={passwordCheckVisible ? faEyeSlash : faEye} style={{ fontSize: "18px", cursor: "pointer", marginTop: "10px" }} />
                        </span>
                    </div>
                    {passwordCheckError && <span className='error' style={{ width: "24%", maginRight: "5px" }}>{passwordCheckError}</span>}
                </div>
                <div className="input-group2">
                    <label htmlFor="username">이름 *</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} onBlur={validateUserNamePatten} required placeholder='2~7자 한글로 작성하세요.' />
                    {userNameError && <span className='error' style={{ width: "23%", marginRight: "5px" }}>{userNameError}</span>}
                </div>
                <div className="input-group2">
                    <label htmlFor="usergender">성별 *</label>
                    <select id="usergender" name="usergender" value={formData.usergender} onChange={handleChange} required >
                        <option value="A">선택하세요 *</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div className="input-group2">
                    <label htmlFor="userbirth">생년월일 *</label>
                    <input type="date" id="userbirth" name="userbirth" value={formData.userbirth}
                        onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="userphone">전화번호 *</label>
                    <input type="text" id="userphone" name="userphone" value={formData.userphone} onChange={handleChange} required
                        style={{ width: "380px" }} />
                    {userPhoneError && <span className="error">{userPhoneError}</span>}
                    <button onClick={""}>인증</button>
                </div>

                <div className="input-group2">
                    <label htmlFor="nickname">닉네임</label>
                    <input type="text" id="nickname" name="nickname" value={formData.nickname}
                        onChange={handleChange} />
                </div>
                <button type="submit" className="register-button">회원 가입</button>
            </form>
        </div>
    );
};

export default RegisterMember;
