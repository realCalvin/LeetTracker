import React from "react";
import { Auth } from "aws-amplify";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import icon from "../components/img/icon.png";
import "../index.css";
import $ from "jquery";

const NavbarC = props => {
  $("#" + props.page).css("color", "white");
  $("#" + props.page).css("font-weight", "500");
  if (props.page === "createPage") {
  }
  // Function to log out current user
  const logOut = () => {
    Auth.signOut()
      .then((window.location = "/"))
      .catch(err => console.log(err));
  };
  return (
    // Navbar that displays on every page
    <div id="Navbar">
      <Navbar
        id="landing-navbar"
        className="navbar transparent navbar-inverse navbar-dark"
        variant="dark"
        expand="lg"
      >
        <Navbar.Brand>
          <a href="/" className="navbar-brand">
            <Image src={icon} alt="Icon" fluid id="icon" /> LeetTracker
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="navbar-link" to="/dashboard" id="dashboard">
              Dashboard
            </Link>
            <Link className="navbar-link" to="/create" id="createPage">
              Create
            </Link>
            <Link className="navbar-link" to="/sets" id="sets">
              Sets
            </Link>
          </Nav>
          <Nav className="ml-auto">
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
