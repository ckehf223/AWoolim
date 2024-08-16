import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MyPageSide from "/src/components/member/mypage/MyPageSide";
import MyProfile from "/src/components/member/mypage/MyProfile";
import "/src/css/member/mypage/MyPage.css";
import UserModify from "/src/components/member/mypage/UserModify";
import UserMyClub from "/src/components/member/mypage/UserMyClub";
import UserMadeClub from "/src/components/member/mypage/UserMadeClub";
import MyClubManager from "/src/components/member/mypage/MyClubManager";
import UserReport from "/src/components/member/mypage/UserReport";
import { useAuth } from "/src/common/AuthContext";

const MyPage = () => {
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      nav("/login");
    }
  }, []);

  return (
    <>
      <div className="MyPage">
        <div className="MyPageWrap">
          <MyPageSide />
          <div className="MyPageMainArea">
            <Routes>
              <Route path="profile" element={<MyProfile />} />
              <Route path="usermodify" element={<UserModify />} />
              <Route path="myclub" element={<UserMyClub />} />
              <Route path="madeclub" element={<UserMadeClub />} />
              <Route path="clubmanager/*" element={<MyClubManager />} />
              <Route path="report" element={<UserReport />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;
