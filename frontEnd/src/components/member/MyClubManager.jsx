import { Route, Routes, useNavigate } from 'react-router-dom'
import '/src/css/member/MyClubManager.css'
import ClubModify from '/src/components/member/ClubModify'
import { Button } from 'reactstrap'
import ClubMember from '/src/components/member/ClubMember'
import ClubAccept from '/src/components/member/ClubAccept'
const MyClubManager = () => {
  const nav = useNavigate();
  return (
    <>
      <div className='MyClubManager'>
        <div className='MyClubManagerWrap'>
          <div className='MyClubManagerContentBorder'>
            <div className='MyClubManagerTitle'>
              <h4>모임 관리 </h4>
            </div>
          </div>
          <div className='MyClubManagerMainArea'>
            <div>
              <Button variant="primary" onClick={() => { nav('/mypage/clubmanager/modify') }}>정보 수정</Button>{' '}
              <Button variant="primary" onClick={() => { nav('/mypage/clubmanager/member') }}>모임 멤버</Button>{' '}
              <Button variant="primary" onClick={() => { nav('/mypage/clubmanager/accept') }}>신청 관리</Button>{' '}
            </div>
            <div className='MyClubManagerContentArea'>
              <Routes>
                <Route path='modify' element={<ClubModify />} />
                <Route path='member' element={<ClubMember />} />
                <Route path='accept' element={<ClubAccept />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default MyClubManager