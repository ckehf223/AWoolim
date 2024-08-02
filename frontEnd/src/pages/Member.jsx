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
      </Routes>
      <Footer />
    </>
  )
}
export default Member;