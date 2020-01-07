import React, { Component } from "react";
import pic1 from "../components/img/landing1.svg";
import { Row, Col, Container } from "react-bootstrap";

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <div id="landing-page">
          <Row>
            <img src={pic1} alt="" />
          </Row>
        </div>
      </div>
    );
  }
}
export default Dashboard;
