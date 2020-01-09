import React from "react";
import { Auth } from "aws-amplify";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";

const NavbarC = () => {
  // Function to log out current user
  const logOut = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };
  return (
    // Navbar that displays on every page
    <div id="Navbar">
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/">LeetTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="navbar-link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="navbar-link" to="/create">
              Create
            </Link>
            <Link className="navbar-link" to="/sets">
              Sets
            </Link>
            <Link className="navbar-link" to="/profile">
              Profile
            </Link>
          </Nav>
          <Nav>
            <Link className="navbar-link" onClick={logOut} to="">
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarC;
