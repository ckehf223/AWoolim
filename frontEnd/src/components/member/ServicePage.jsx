import { Route, Routes, useNavigate } from "react-router-dom";
import NoticeCustom from "/src/components/admin/notice/NoticeCustom";
import FaqMainCustom from '/src/components/admin/FAQ/FaqMainCustom'
import '/src/css/member/ServicePage.css';
import NoticeReadCustom from "/src/components/admin/notice/NoticeReadCustom";
const ServicePage = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="ServicePage">
        <div className="ServicePageWrap">
          <div className="ServiceSideArea">
            <div className="ServiceSideBox">
              <h4>고객센터</h4>
              <div className="ServiceSideMenuArea">
                <div className="ServiceSideMenu">
                  <span onClick={() => { nav('/service/FAQ') }}>자주 묻는 질문</span>
                  <span onClick={() => { nav('/service/notice') }}>공지사항</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ServiceMainArea">
            <Routes>
              <Route path="/notice" element={<NoticeCustom />} />
              <Route path="/FAQ" element={<FaqMainCustom />} />
              <Route path="/noticeRead/:noticeNo" element={<NoticeReadCustom />} />
            </Routes>
          </div>
        </div>
      </div >
    </>
  )
}
export default ServicePage;