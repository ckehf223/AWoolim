import '/src/css/member/sign/MemberIntro.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/common/AuthContext'
import { useEffect } from 'react';
const joinGoogle = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
}
const joinNaver = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
}

const MemberIntro = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            nav('/');
        }
    })

    const nav = useNavigate();
    return (
        <div className="MemberIntro">
            <div className='miHeader'>
                <img src="src\assets\images\headerLogo.png" onClick={() => { nav('/') }} /><br></br>
                <span >지금 회원가입하신 후 어울림에서 다양한 인연을 만들어보세요!</span>
            </div>
            <div className="joinWay">
                <button className="classic" onClick={() => nav('/joinMember')}>&nbsp;개인 회원가입</button>
                {/* <button className='kakao'>
                    <img src="src\assets\images\kakao_member2.png" alt="" /></button> */}
                <button className='naver' onClick={joinNaver}>
                    <span className="naver_span" >N</span><span> 네이버로 시작하기</span>
                </button>
                <button className='googleLogo' onClick={joinGoogle}>
                    <img src="/src/assets/images/googleLogin.png" /><span>구글로 시작하기</span>
                </button>
            </div>
        </div>
    )
}

export default MemberIntro;