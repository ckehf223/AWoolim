import React from "react";
import "./Header.css";
import { Navbar, NavbarBrand, NavItem, Nav, NavLink } from "reactstrap";

const Header = () => {

  return (
    <div className="Header">
      <Navbar color="light" light expand="md" className="navbar-custom">
        <NavbarBrand href="#" className="navbar-brand-custom">Admin Page</NavbarBrand>
        <Nav className="ml-auto" navbar >
          <NavItem>
            <NavLink href="#">로그아웃</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">고객사이트</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default Header;