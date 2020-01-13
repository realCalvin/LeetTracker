import React, { Component } from "react";
import "../index.css";
import { Row, Navbar, Nav, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorPic from "../components/img/404.svg";

class Error extends Component {
  state = {};

  render() {
    return (
      <div className="Error">
        <Navbar
          id="landing-navbar"
          className="navbar transparent navbar-inverse"
          variant="dark"
        >
          <Navbar.Brand>
            <a href="/" className="navbar-brand">
              LeetTracker
            </a>
          </Navbar.Brand>
          {this.state.user ? (
            <Nav className="mr-auto">
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
          ) : (
            ""
          )}
        </Navbar>
        <div id="landing-page">
          <div className="wave wave1" id="nav-wave"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <Row id="landing-content">
            <Col>
              <Image id="landing-pic1" src={ErrorPic} alt="Landing Pic" fluid />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Error;
