import { Route, Routes } from "react-router-dom"
import MyPageSide from "../components/MyPageSide"
import MyProfile from "./MyProfile"
import './MyPage.css'

const MyPage = () => {
  return (
    <>
      <div className="MyPage">
        <div className="MyPageWrap">
          <MyPageSide />
          <div className="MyPageMainArea">
            <Routes>
              <Route path='profile' element={<MyProfile />} />
            </Routes >
          </div>
        </div>
      </div>

    </>
  )
}
export default MyPage