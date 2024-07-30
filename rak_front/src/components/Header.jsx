import React from "react";
import "./Header.css";
import { Navbar, NavbarBrand, NavItem, Nav, NavLink } from "reactstrap";
import { SlLogout } from "react-icons/sl";

const Header = () => {

  return (
    <div className="Header">
      <Navbar light expand="md" className="navbar-custom my-navbar-color">
        <NavbarBrand href="/" className="navbar-brand-custom"><img src="src/assets/headerLogo.png" /></NavbarBrand>
        <Nav className="ml-auto" navbar >
          <NavItem>
            <NavLink href="#">Logout</NavLink>
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