import './App.css';
import Admin from './pages/Admin';
import Member from './pages/Member';
import { Routes, Route } from 'react-router-dom';
{/* 추가한 부분 */ }
import MemberIntro from '/src/pages/member/MemberIntro';
import RegisterMember from '/src/pages/member/RegisterMember';
import LoginMain from '/src/pages/member/login/LoginMain';
function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<Member />} />
        <Route path="/admin/*" element={<Admin />} />
        {/* 추가한 부분 */}
        <Route path='/login' element={<LoginMain />} />
        <Route path='/signup' element={<MemberIntro />} />
        <Route path='/joinMember' element={<RegisterMember />} />
      </Routes >
    </>
  )
}

export default App
