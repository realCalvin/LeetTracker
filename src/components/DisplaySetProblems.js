import React, { Component } from "react";
import "../index.css";
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as queries from "../graphql/queries";
import { Card, Row, Button, Col, Table, Spinner } from "react-bootstrap";

class DisplaySetProblems extends Component {
  state = {
    problems: [],
    loaded: false
  };
  async componentDidUpdate() {
    if (this.state.loaded === false) {
      this.setState({
        problems: this.props.problems
      });
      this.setState({
        loaded: true
      });
    }
  }

  render() {
    // function used to sort the set of problems via "difficulty level"
    function compare(a, b) {
      const levelA = a.level;
      const levelB = b.level;

      let comparison = 0;
      if (levelA > levelB) {
        comparison = 1;
      } else if (levelA < levelB) {
        comparison = -1;
      }
      return comparison;
    }

    let problems = null;
    if (this.state.problems.length) {
      let temp = this.state.problems;

      problems = temp.sort(compare).map(problem => {
        return (
          <tr key={problem.id}>
            <td>
              <a href={"https://leetcode.com/problems/" + problem.url}>
                {problem.title}
              </a>
            </td>
            <td>{problem.level}</td>
            <td>{problem.time}</td>
            <td>
              {problem.completed ? (
                <i className="fa fa-check"></i>
              ) : (
                <i className="fa fa-times"></i>
              )}
            </td>
          </tr>
        );
      });
    }

    return (
      <Row id="view-set-row" className="card-row">
        {this.state.loaded ? (
          <Table striped bordered hover id="set-problem-table">
            <thead>
              <tr>
                <th>Problems</th>
                <th>Difficulty</th>
                <th>Time</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>{problems}</tbody>
          </Table>
        ) : (
          <Spinner animation="border" variant="dark" />
        )}
      </Row>
    );
  }
}
export default DisplaySetProblems;
