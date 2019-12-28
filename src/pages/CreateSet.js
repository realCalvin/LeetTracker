import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import Pagination from "../components/Pagination";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
  Container,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import data from "../data.json";
import "../index.css";

class CreateSet extends Component {
  state = {
    problems: data,
    currentPage: 1,
    problemsPerPage: 54
  };
  render() {
    // Variables below are used for pagination on the create set page
    const indexOfLastProblem =
      this.state.currentPage * this.state.problemsPerPage;
    const indexOfFirstProblem = indexOfLastProblem - this.state.problemsPerPage;
    const currentProblems = this.state.problems.slice(
      indexOfFirstProblem,
      indexOfLastProblem
    );

    // Function sets the current page number we are on for pagination
    const paginate = pageNumber => {
      this.setState({
        currentPage: pageNumber
      });
    };

    // constantly listens to the input & updates the displayed LeetCode problems
    let updateSearch = e => {
      let newProblems = [];
      // filter through data
      data.filter(problem => {
        let title = problem.title.toLowerCase();
        if (title.includes(e.target.value.toLowerCase())) {
          newProblems.push(problem);
        }
      });
      this.setState({
        problems: newProblems
      });
    };
    // Function used in JSX to display LeetCode difficulty
    let checkLevel = level => {
      if (level == 1) {
        return "Easy";
      } else if (level == 2) {
        return "Medium";
      } else {
        return "Hard";
      }
    };
    // Mapping out all the problems and displaying as a card
    let filteredProblems = currentProblems.map(problem => (
      <OverlayTrigger
        key={problem.id}
        placement={"top"}
        overlay={
          <Tooltip id={`tooltip-${"top"}`}>
            Click to <strong>add</strong>! (ᵔ▾ᵔ) .
          </Tooltip>
        }
      >
        <Card
          bg="light"
          style={{ width: "18rem" }}
          key={problem.id}
          id={problem.id}
        >
          <Card.Header className={"card-level-" + problem.level}>
            {checkLevel(problem.level)}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <a href={"https://leetcode.com/problems/" + problem.url}>
                {problem.title}
              </a>
            </Card.Text>
          </Card.Body>
        </Card>
      </OverlayTrigger>
    ));

    return (
      <div className="CreateSet">
        <Container>
          <Row className="justify-content-md-center">
            <h1>Create Set</h1>
          </Row>
          <Row className="justify-content-md-center">
            <InputGroup className="mb-3">
              <FormControl onChange={updateSearch} />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={updateSearch}>
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Row>
          <Row id="card-row">{filteredProblems}</Row>
          <Pagination
            problemsPerPage={this.state.problemsPerPage}
            totalProblems={this.state.problems.length}
            paginate={paginate}
          />
        </Container>
      </div>
    );
  }
}
export default CreateSet;
