import './MemberIntro.css'
import { useNavigate } from 'react-router-dom';

const MemberIntro = () => {
    const navi = useNavigate();
    return (
        <div className="MemberIntro">
            <div className='miHeader'>
                <img src="src\assets\images\headerLogo.png" alt="" /><br></br>
                <span style={{ fontSize: "14px" }}>지금 회원가입하신 후 어울림에서 다양한 인연을 만들어보세요.</span>
            </div>
            <div className="joinWay">
                <button className="classic" onClick={() => navi('/joinMember')}>&nbsp;개인 회원가입</button>
                <button className='kakao'>
                    <img src="src\assets\images\kakao_member2.png" alt="" /></button>
                <button className='naver'>
                    <span className="naver_span" >N</span><span> 네이버로 시작하기</span>
                </button>
                <button className='googleLogo'>
                    <img src="src\assets\images\googleLogo.png" alt="" /><span>구글로 시작하기</span></button>
            </div>
        </div>
    )
}

export default MemberIntro;