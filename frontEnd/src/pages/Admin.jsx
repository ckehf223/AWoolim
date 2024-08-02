import { Routes, Route } from 'react-router-dom'
import '/src/css/admin/Admin.css';
import AdminHeader from '../components/admin/AdminHeader';

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
              <Route path='/' element={<Dashboard />} />
              <Route path='/user' element={<UserManager />} />
              <Route path='/club' element={<ClubManager />} />
              <Route path='/club/:clubId' element={<ClubDetail />} />
              <Route path='/report' element={<ReportManager />} />
              <Route path='/noice' element={<Notice />} />
              <Route path="/noticeWrite" element={<NoticeWrite />} />
              <Route path="/noticeRead/:noticeNo" element={<NoticeRead />} />
              <Route path="/noticeReWrite/:noticeNo" element={<NoticeReWrite />} />
              <Route path="/faq" element={<FaqMain />} />
              <Route path="/faqcus" element={<FaqMainCustom />} />
              <Route path="/faqWrite" element={<FaqWrite />} />
              <Route path="/faqReWrite" element={<FaqReWrite />} />
            </Routes>
          </ClubProvider>
        </div>
      </div>
    </div>

  )
}
export default Admin;