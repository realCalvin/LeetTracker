import React, { Component } from "react";
import pic1 from "../components/img/landing1.svg";
import pic2 from "../components/img/landing2.png";
import { Row, Col, Button, Image, ProgressBar, Toast } from "react-bootstrap";

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <div id="landing-page">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <Row id="landing-content">
            <Col>
              <div id="landing-content-1">
                <h1>LeetTracker</h1>
                <p>Find sets of problems and track your progress</p>
                <Button variant="outline-light">Get Started</Button>
              </div>
              <div id="landing-content-2">
                <Image id="landing-pic1" src={pic1} alt="Landing Pic" fluid />
              </div>
            </Col>
          </Row>
        </div>
        <div id="landing-page2">
          <Row id="landing-description">
            <Col>
              <Image id="landing-pic2" src={pic2} alt="Landing Pic" fluid />
            </Col>
            <Col>
              <Toast>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                  />
                  <strong className="mr-auto">LeetTracker</strong>
                  <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world!</Toast.Body>
              </Toast>
              <Toast>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                  />
                  <strong className="mr-auto">Get Started</strong>
                  <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Sign up and log in!</Toast.Body>
              </Toast>
              <Toast>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                  />
                  <strong className="mr-auto">Next Step</strong>
                  <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>
                  Create your own set of LeetCode problems.
                </Toast.Body>
              </Toast>
              <Toast>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                  />
                  <strong className="mr-auto">Last Step</strong>
                  <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>
                  Track your progress and improve!
                  <ProgressBar animated now={45} />
                </Toast.Body>
              </Toast>
            </Col>
          </Row>
          <div className="dark-wave wave1"></div>
          <div className="dark-wave wave2"></div>
          <div className="dark-wave wave3"></div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
