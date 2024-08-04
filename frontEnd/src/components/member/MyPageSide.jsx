import { useNavigate } from 'react-router-dom'
import '/src/css/member/MyPageSide.css'
const MyPageSide = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="MyPageSideArea">
        <h4>마이페이지</h4>
        <div className="MyPageInfoMenuArea">
          <div className="MyPageInfoHeader">
            <img src="/src/assets/images/user.png" />
            <h5>내 정보</h5>
          </div>
          <div className="MyPageInfoMenu">
            <span onClick={() => { nav('/mypage/profile') }}>프로필 관리</span>
            <span onClick={() => { nav('/mypage/usermodify', { replace: true }) }}>회원 정보수정</span>
          </div>
        </div>

        <div className="MyPageClubMenuArea">
          <div className="MyPageClubHeader">
            <img src="/src/assets/images/group2.png" />
            <h5>모임 정보</h5>
          </div>
          <div className="MyPageClubMenu">
            <span onClick={() => { nav('/mypage/myclub') }}>참여모임</span>
            <span onClick={() => { nav('/mypage/madeclub') }}>내 모임</span>
          </div>
        </div>

        <div className="myPageReportMenu">
          <img src="/src/assets/images/warning.png" />
          <h5 onClick={() => { nav('/mypage/report') }}>신고내역</h5>
        </div>

      </div>
    </>
  )
}

export default MyPageSide