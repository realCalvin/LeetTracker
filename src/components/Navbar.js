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
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">LeetCode</Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="navbar-link" to="/">
            Home
          </Link>
          <Link className="navbar-link" to="/create">
            Create
          </Link>
          <Link className="navbar-link" to="/profile">
            Profile
          </Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={logOut}>Logout</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavbarC;
