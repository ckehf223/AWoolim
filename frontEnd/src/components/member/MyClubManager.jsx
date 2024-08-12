import { Route, Routes, useNavigate } from 'react-router-dom'
import '/src/css/member/MyClubManager.css'
import ClubModify from '/src/components/member/ClubModify'
import ClubMember from '/src/components/member/ClubMember'
import ClubAccept from '/src/components/member/ClubAccept'

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