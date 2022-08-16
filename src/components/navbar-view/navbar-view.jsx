import React from "react";
import { Navbar, Container, Nav,Button, } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Menubar() {
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
    <Navbar bg="dark" expand="lg" className="mb-5" >
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