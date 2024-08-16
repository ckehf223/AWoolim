import React from "react";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import '/src/css/admin/common/Sidebar.css'


const Sidebar = () => {

  return (
    <>
      <div className="Sidebar">
        <div className=" border-right" style={{ minHeight: '100vh' }}>
          <Nav vertical>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="/admin/dashboard">대시보드</Link>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="/admin/user">사용자관리</Link>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="/admin/club">모임관리</Link>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="/admin/report">신고관리</Link>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="/admin/notice">공지사항</Link>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="/admin/faq">고객지원</Link>
            </NavItem>
          </Nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar;