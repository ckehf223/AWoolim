import { Routes, Route } from "react-router-dom";
import Header from "/src/components/member/common/Header";
import Footer from "/src/components/member/common/Footer";
import Home from "/src/pages/member/Home";
import SearchPage from "/src/pages/member/SearchPage";
import GroupPage from "/src/pages/member/GroupPage";
import ClubRegister from "/src/components/member/club/ClubRegister";
import ClubDetailInfo from "/src/components/member/club/ClubDetailInfo";
import MyPage from "/src/components/member/mypage/MyPage";
import AsideButton from "/src/components/member/common/AsideButton";
import ServicePage from "/src/components/member/service/ServicePage";
import GroupNav from "/src/components/member/service/GroupNav";
const Member = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/newclub" element={<ClubRegister />} />
        <Route path="/club/:no" element={<ClubDetailInfo />} />{" "}
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/service/*" element={<ServicePage />} />
        <Route path="/includeclub/*" element={<GroupNav />} />
      </Routes >
      <AsideButton />
      <Footer />
    </>
  );
};

export default Member;
