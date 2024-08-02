import { Route, Routes } from "react-router-dom"
import MyPageSide from "../components/MyPageSide"
import MyProfile from "./MyProfile"
import './MyPage.css'
import UserModify from "./UserModify"
import UserMyClub from "./UserMyClub"
import UserMadeClub from "./UserMadeClub"
import MyClubManager from "./MyClubManager"
import UserReport from "./UserReport"

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