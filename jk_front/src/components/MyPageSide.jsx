import './MyPageSide.css'
const MyPageSide = () => {
  return (
    <>
      <div className="MyPageSideArea">
        <h2>마이페이지</h2>

        <div className="MyPageInfoMenuArea">
          <div className="MyPageInfoHeader">
            <img src="/src/images/user.png" />
            <h3>내 정보</h3>
          </div>
          <div className="MyPageInfoMenu">
            <span>프로필 관리</span>
            <span>회원 정보수정</span>
          </div>
        </div>

        <div className="MyPageClubMenuArea">
          <div className="MyPageClubHeader">
            <img src="/src/images/group2.png" />
            <h3>모임 정보</h3>
          </div>
          <div className="MyPageClubMenu">
            <span>참여모임</span>
            <span>내 모임</span>
          </div>
        </div>

        <div className="myPageReportMenu">
          <img src="/src/images/report.png" />
          <h3>신고내역</h3>
        </div>

      </div>
    </>
  )
}

export default MyPageSide