import React, { Component } from "react";
import "../index.css";
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as queries from "../graphql/queries";
import { Card, Row, Button } from "react-bootstrap";

class ViewSets extends Component {
  state = {
    problems: []
  };

  async componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push({ pathname: "/profile" });
    }
    console.log(this.props.location.state);
  }

  render() {
    return (
      <div className="Profile">
        <h1>Set</h1>
        <Row className="card-row"></Row>
      </div>
    );
  }
}
export default ViewSets;
