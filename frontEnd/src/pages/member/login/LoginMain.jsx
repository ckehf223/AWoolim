import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const LoginMain = () => {
    const navi = useNavigate();

    const [useremail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="LoginMain">
            <div className="logo-container">
                <img src="src\assets\images\headerLogo.png" alt="어울림" />
            </div>
            <form className="login-form" onSubmit={""}>
                <div className="input-group">
                    <label htmlFor="username" style={{ width: "40px" }}>
                        <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "20px" }} />
                    </label>
                    <input type="text" id="username" onChange={(e) => setUserEmail(e.target.value)} placeholder="아이디" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password" style={{ width: "40px" }}>
                        <FontAwesomeIcon icon={faKey} style={{ fontSize: "20px" }} />
                    </label>
                    <input type={showPassword ? "text" : "password"} id="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required placeholder="비밀번호" />
                    <span className="password-toggle" onClick={toggleShowPassword}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ fontSize: "18px", cursor: "pointer" }} />
                    </span>
                </div>
                <div className="checkbox-group">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">로그인 상태 유지</label>
                </div>
                <button type="submit" className="login-button">로그인</button>
            </form>
            <div className="help-links">
                <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a> | <Link to='/signup'>회원가입</Link>
            </div>
            <div className="social-login">
                <button><img className="kakao" src="src/assets/images/kakaoLogin.png" alt="kakao" /></button>
                <button><img className="naver" src="src/assets/images/naverLogin.png" alt="naver" style={{ width: "45px", height: "45px" }} /></button>
                <button><img className="google" src="src/assets/images/googleLogin.png" alt="google" /></button>
            </div>
        </div>
    );
};

export default LoginMain;
