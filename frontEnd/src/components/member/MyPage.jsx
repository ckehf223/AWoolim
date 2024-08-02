import { Route, Routes } from "react-router-dom"
import MyPageSide from "/src/components/member/MyPageSide"
import MyProfile from "/src/components/member/MyProfile"
import '/src/css/member/MyPage.css'
import UserModify from "/src/components/member/UserModify"
import UserMyClub from "/src/components/member/UserMyClub"
import UserMadeClub from "/src/components/member/UserMadeClub"
import MyClubManager from "/src/components/member/MyClubManager"
import UserReport from "/src/components/member/UserReport"

const MyPage = () => {
  return (
    <>
      <div className="MyPage">
        <div className="MyPageWrap">
          <MyPageSide />
          <div className="MyPageMainArea">
            <Routes>
              <Route path='profile' element={<MyProfile />} />
              <Route path='usermodify' element={<UserModify />} />
              <Route path='myclub' element={<UserMyClub />} />
              <Route path='madeclub' element={<UserMadeClub />} />
              <Route path='clubmanager/*' element={<MyClubManager />} />
              <Route path='report' element={<UserReport />} />
            </Routes >
          </div>
        </div>
      </div>

    </>
  )
}
export default MyPage