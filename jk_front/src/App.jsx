import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import ClubDetailInfo from './pages/ClubDetailInfo'
import ClubRegister from './pages/ClubRegister'
import { Routes, Route } from 'react-router-dom'
import MyPage from './pages/MyPage'

function App() {

  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/newclub" element={<ClubRegister />} />
          <Route path="/club" element={<ClubDetailInfo />} />
          <Route path='/mypage/*' element={<MyPage />} />
        </Routes >
        <Footer />
      </div >
    </>
  )
}

export default App
