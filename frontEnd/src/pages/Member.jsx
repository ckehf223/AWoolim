import { Routes, Route } from 'react-router-dom';
import Header from '/src/components/member/Header';
import Footer from '/src/components/member/Footer';
import Home from '/src/pages/member/Home';
import SearchPage from '/src/pages/member/SearchPage';
import GroupPage from '/src/pages/member/GroupPage';
import ClubRegister from '/src/components/member/ClubRegister';
import ClubDetailInfo from '/src/components/member/ClubDetailInfo';
import MyPage from '/src/components/member/MyPage';

const Member = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/newclub" element={<ClubRegister />} />
        <Route path="/club" element={<ClubDetailInfo />} />
        <Route path='/mypage/*' element={<MyPage />} />
      </Routes >
      <Footer />
    </>
  )
}
export default Member;