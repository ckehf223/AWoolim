import './App.css';
import Admin from '/src/pages/admin/Admin';
import Member from '/src/pages/member/Member';
import { Routes, Route, Router } from 'react-router-dom';
import MemberIntro from '/src/components/member/sign/MemberIntro';
import RegisterMember from '/src/components/member/sign/RegisterMember';
import LoginMain from '/src/components/member/sign/LoginMain';
import FindbyId from '/src/components/member/sign/FindbyId';
import FindbyPw from '/src/components/member/sign/FindbyPw';
import { AuthProvider } from '/src/common/AuthContext';
import OAuth2RedirectHandler from '/src/common/OAuth2RedirectHandler';
import PrivateRoute from '/src/common/PrivateRoute';
import AdminLoginMain from '/src/components/admin/adminLogin/AdminLoginMain';
{/* 추가한 부분 */ }
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<Member />} />
          <Route path='/admin/login' element={<AdminLoginMain />} />
          <Route path="/admin/*" element={<PrivateRoute element={< Admin />} />} />
          <Route path='/login' element={<LoginMain />} />
          <Route path='/signup' element={<MemberIntro />} />
          <Route path='/joinMember' element={<RegisterMember />} />
          {/* 추가한 부분 */}
          <Route path='/findbyid' element={<FindbyId />} />
          <Route path='/findbypw' element={<FindbyPw />} />
          <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler />} />
        </Routes >
        {/* </Router> */}
      </AuthProvider>
    </>
  );
}

export default App;
