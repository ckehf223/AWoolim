import React from "react";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import '/src/css/admin/Sidebar.css'


const Sidebar = () => {

  return (
    <>
      <div className="Sidebar">
        <div className=" border-right" style={{ minHeight: '100vh' }}>
          <Nav vertical>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="/">대시보드</Link>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="/user">사용자관리</Link>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="/club">모임관리</Link>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="/report">신고관리</Link>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="#">공지사항</Link>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Link className="nav-link" to="#">고객지원</Link>
            </NavItem>
          </Nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar;