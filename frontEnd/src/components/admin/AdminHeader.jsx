import React from "react";
import "/src/css/admin/AdminHeader.css";
import { Navbar, NavbarBrand, NavItem, Nav, NavLink } from "reactstrap";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

const AdminHeader = () => {

  return (
    <div className="AdminHeader">
      <Navbar light expand="md" className="navbar-custom my-navbar-color">
        <NavbarBrand href="/admin" className="navbar-brand-custom"><img src="/src/assets/images/headerLogo.png" /></NavbarBrand>
        <Nav className="ml-auto" navbar >
          <NavItem>
            <NavLink href="#"><FaSignOutAlt />Logout</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#"><FaUser />고객사이트</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default AdminHeader;