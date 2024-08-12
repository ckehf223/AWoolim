import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '/src/css/member/LoginMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '/src/common/AuthContext'

const LoginMain = () => {
    const nav = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const [useremail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isAuthenticated)
            nav('/');
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(useremail, password);
            if (response.status === 200) {
                nav(-1, { replace: true });
            } else {
                setMessage('아이디 비밀번호를 확인해 주세요');
                setUserEmail('');
                setPassword('');
                e.target.reset();
            }
        } catch (error) {
            setMessage('아이디 비밀번호를 확인해 주세요');
            setUserEmail('');
            setPassword('');
            e.target.reset();
        }
    };

    const findInfo = (e, url, title) => {
        e.preventDefault();
        const width = 650; // 팝업 창의 너비
        const height = 700; // 팝업 창의 높이
        const left = (window.screen.width / 2) - (width / 2); // 화면 중앙에 위치하도록 수평 위치 계산
        const top = (window.screen.height / 2) - (height / 2); // 화면 중앙에 위치하도록 수직 위치 계산

        const specs = `width=${width},height=${height},top=${top},left=${left}`;
        window.open(url, title, specs);
    }


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const naverLogin = (e) => {
        e.preventDefault();
        window.location.href = "http://localhost:8080/oauth2/authorization/naver";
    }

    const googleLogin = (e) => {
        e.preventDefault();
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    }

    return (
        <div className='LoginMainWrap'>
            <div className="LoginMain">
                <div className="logo-container">
                    <img src="src\assets\images\headerLogo.png" alt="어울림" onClick={() => { nav('/') }} />
                </div>
                <form className="login-form">
                    <div className="LoginMainInput-group">
                        <label htmlFor="username" style={{ width: "40px" }}>
                            <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "20px" }} />
                        </label>
                        <input type="text" id="username" value={useremail} onChange={(e) => setUserEmail(e.target.value)} placeholder="아이디" required />
                    </div>
                    <div className="LoginMainInput-group">
                        <label htmlFor="password" style={{ width: "40px" }}>
                            <FontAwesomeIcon icon={faKey} style={{ fontSize: "20px" }} />
                        </label>
                        <input type={showPassword ? "text" : "password"} id="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required placeholder="비밀번호" autoComplete="off" />
                        <span className="password-toggle" onClick={toggleShowPassword}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ fontSize: "18px", cursor: "pointer" }} />
                        </span>
                    </div>
                    <div className='LoginMainCheckMessageArea'>
                        <span className='LoginMainCheckMessage'>{message}</span>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">로그인 상태 유지</label>
                    </div>
                    <button type="submit" className="login-button" onClick={handleSubmit}>로그인</button>
                </form>
                <div className="help-links">
                    <a href="#" onClick={() => findInfo(event, '/findbyid', '아이디 찾기')}>아이디 찾기</a> | <a href="#" onClick={() => findInfo(event, '/findbypw', '비밀번호 찾기')}>비밀번호 찾기</a> | <Link to='/signup'>회원가입</Link>
                </div>
                <div className="social-login">
                    <button><img className="naver" src="src/assets/images/naverLogin.png" alt="naver" onClick={naverLogin} style={{ width: "45px", height: "45px" }} /></button>
                    <button><img className="google" src="src/assets/images/googleLogin.png" alt="google" onClick={googleLogin} /></button>
                </div>
            </div>
        </div>
    );
};

export default LoginMain;
