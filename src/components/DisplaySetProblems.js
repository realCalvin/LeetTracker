import React, { Component } from "react";
import "../index.css";
import { Row, Button, Table, Spinner, Badge } from "react-bootstrap";
import DisplayProblem from "../components/DisplayProblem";

class DisplaySetProblems extends Component {
  state = {
    problems: [],
    loaded: false,
    showModal: false,
    id: "",
    title: "",
    url: "",
    level: "",
    time: ""
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
    // Toggle modal for the problem that the user clicked on & retrieve the problem's info
    let showProblem = (id, title, url, level, time) => {
      this.setState({
        showModal: true,
        id: id,
        title: title,
        url: url,
        level: level,
        time: time
      });
    };

    // Toggle modal to close
    let closeModal = () => {
      this.setState({
        showModal: false
      });
    };

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
      // Variable problems stores the set's problems in difficult level order
      problems = temp.sort(compare).map(problem => {
        let level;
        if (problem.level === "1") {
          level = <Badge variant="success">Easy</Badge>;
        } else if (problem.level === "2") {
          level = <Badge variant="warning">Medium</Badge>;
        } else {
          level = <Badge variant="danger">Hard</Badge>;
        }
        return (
          <tr key={problem.id}>
            <td>
              <a href={"https://leetcode.com/problems/" + problem.url}>
                {problem.title}
              </a>
            </td>
            <td>{level}</td>
            <td>{problem.time}</td>
            <td>
              <Button
                variant="outline-dark"
                size="sm"
                id={problem.id}
                onClick={() => {
                  showProblem(
                    problem.id,
                    problem.title,
                    problem.url,
                    problem.level,
                    problem.time
                  );
                }}
              >
                View
              </Button>
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
                <th>Best Time</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>{problems}</tbody>
          </Table>
        ) : (
          <Spinner animation="border" variant="dark" />
        )}
        <DisplayProblem
          showModal={this.state.showModal}
          closeModal={closeModal}
          id={this.state.id}
          title={this.state.title}
          url={this.state.url}
          level={this.state.level}
          time={this.state.time}
        />
      </Row>
    );
  }
}
export default DisplaySetProblems;
