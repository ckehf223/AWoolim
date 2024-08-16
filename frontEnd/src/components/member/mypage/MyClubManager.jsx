import { Route, Routes, useNavigate } from 'react-router-dom'
import '/src/css/member/mypage/MyClubManager.css'
import ClubModify from '/src/components/member/club/ClubModify'
import ClubMember from '/src/components/member/club/ClubMember'
import ClubAccept from '/src/components/member/club/ClubAccept'

const MyClubManager = () => {

  return (
    <>
      <div className='MyClubManager'>
        <div className='MyClubManagerWrap'>
          <div className='MyClubManagerContentBorder'>
            <div className='MyClubManagerTitle'>
              <h4>모임 관리</h4>
            </div>
          </div>
          <Routes>
            <Route path='modify/:no' element={<ClubModify />} />
            <Route path='member/:no' element={<ClubMember />} />
            <Route path='accept/:no' element={<ClubAccept />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default MyClubManager;