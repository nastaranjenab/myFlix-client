import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavBar() {
  let user = localStorage.getItem("user");

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar expand="md">
      <Navbar.Brand as={Link} to={"/"}>
        My-Flix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark" />

      {isAuth() && (
        <Navbar.Collapse id="basic-navbar-nav navbar-dark">
          <Nav className="h1 titles">
            <Link to={`/users/${user}`}>Hi, {user}</Link>{" "}
            <Link
              onClick={() => {
                onLoggedOut();
              }}
            >
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
  }).isRequired,
};