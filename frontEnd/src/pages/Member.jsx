import { Routes, Route } from "react-router-dom";
import Header from "/src/components/member/Header";
import Footer from "/src/components/member/Footer";
import Home from "/src/pages/member/Home";
import SearchPage from "/src/pages/member/SearchPage";
import GroupPage from "/src/pages/member/GroupPage";
import ClubRegister from "/src/components/member/ClubRegister";
import ClubDetailInfo from "/src/components/member/ClubDetailInfo";
import MyPage from "/src/components/member/MyPage";
import AsideButton from "/src/components/member/AsideButton";
import ServicePage from "/src/components/member/ServicePage";
import GroupNav from "/src/components/member/GroupNav";
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
