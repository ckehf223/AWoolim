import { Routes, Route } from 'react-router-dom'
import '/src/css/admin/Admin.css';
import AdminHeader from '../components/admin/AdminHeader';
import { ClubProvider } from '../components/admin/ClubProvider';
import Sidebar from '/src/components/admin/Sidebar';
import Dashboard from '/src/components/admin/Dashboard';
import UserManager from '/src/components/admin/UserManager';
import ClubManager from '/src/components/admin/ClubManager';
import ClubDetail from '/src/components/admin/ClubDetail';
import ReportManager from '/src/components/admin/ReportManager';
import Notice from '/src/components/admin/notice/Notice';
import NoticeWrite from '/src/components/admin/notice/NoticeWrite';
import NoticeRead from '/src/components/admin/notice/NoticeRead';
import NoticeReWrite from '/src/components/admin/notice/NoticeReWrite';
import FaqMain from '/src/components/admin/FAQ/FaqMain';
import FaqMainCustom from '/src/components/admin/FAQ/FaqMainCustom';
import FaqWrite from '/src/components/admin/FAQ/FaqWrite';
import FaqReWrite from '/src/components/admin/FAQ/FaqReWrite';
import AdminLoginMain from '../components/admin/adminLogin/AdminLoginMain';
import NoticeCustom from '../components/admin/notice/NoticeCustom';
import NoticeReadCustom from '../components/admin/notice/NoticeReadCustom';


const Admin = () => {
  return (
    <div className='Admin'>
      <AdminHeader />
      <div className='AdminMainContainer'>
        <Sidebar />
        <div className='AdminMainContent'>
          <ClubProvider>
            <Routes>
              {/* 렌더링할 페이지  */}
              <Route path='/' element={<AdminLoginMain />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/user' element={<UserManager />} />
              <Route path='/club' element={<ClubManager />} />
              <Route path='/club/:clubId' element={<ClubDetail />} />
              <Route path='/report' element={<ReportManager />} />
              <Route path='/notice' element={<Notice />} />
              <Route path='/noticeCustom' element={<NoticeCustom />} />
              <Route path="/noticeWrite" element={<NoticeWrite />} />
              <Route path="/noticeRead/:noticeNo" element={<NoticeRead />} />
              <Route path="/noticeReadCustom/:noticeNo" element={<NoticeReadCustom />} />
              <Route path="/noticeReWrite/:noticeNo" element={<NoticeReWrite />} />
              <Route path="/faq" element={<FaqMain />} />
              <Route path="/faqCustom" element={<FaqMainCustom />} />
              <Route path="/faqWrite" element={<FaqWrite />} />
              <Route path="/faqReWrite/:questionNo" element={<FaqReWrite />} />
            </Routes>
          </ClubProvider>
        </div>
      </div>
    </div>

  )
}
export default Admin;