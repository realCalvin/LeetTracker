import React, { Component } from "react";
import Pagination from "../components/Pagination";
import {
  Row,
  InputGroup,
  FormControl,
  Button,
  Container
} from "react-bootstrap";
import DisplayCard from "../components/DisplayCard";
import data from "../data.json";
import "../index.css";

class CreateSet extends Component {
  state = {
    problems: data,
    currentPage: 1,
    problemsPerPage: 54,
    set: []
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
      // eslint-disable-next-line
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
      if (level === 1) {
        return "Easy";
      } else if (level === 2) {
        return "Medium";
      } else {
        return "Hard";
      }
    };

    // Function used to add "clicked" LeetCode problem to the user's set
    let addCard = (id, title, url, level) => {
      let set = this.state.set;
      let duplicate = false;
      // For loop used to check if we are adding a duplicate problem
      for (let i = 0; i < set.length; i++) {
        if (id === set[i].id) {
          duplicate = true;
        }
      }
      // If not duplicate, add to user's set
      if (!duplicate) {
        set.push({ id, title, url, level, completed: false, time: null });
        this.setState({
          set: set
        });
      } else {
        console.log("Duplicate");
      }
    };

    let removeCard = (id, title, url, level) => {
      let set = this.state.set;
      let newSet = [];
      for (let i = 0; i < set.length; i++) {
        if (set[i].id !== id) {
          newSet.push(set[i]);
        }
      }
      this.setState({
        set: newSet
      });
    };

    // Mapping out all the problems and displaying as a card
    let filteredProblems = currentProblems.map(problem => (
      <DisplayCard
        key={problem.id}
        problem={problem}
        actionOnCard={addCard}
        checkLevel={checkLevel}
        toolMessage="Click to add! (ᵔ▾ᵔ)"
      />
    ));

    let createSet = () => {
      console.log(this.state.set);
    };

    return (
      <div className="CreateSet">
        <Container>
          <Row className="card-row">
            <h1>Your Set</h1>
          </Row>
          <Row className="card-row">
            {/* Display user's set of problems if length > 0 */}
            {this.state.set.length
              ? this.state.set.map(problem => (
                  // DisplayCard is the card used to display problems
                  <DisplayCard
                    key={problem.id}
                    problem={problem}
                    actionOnCard={removeCard}
                    checkLevel={checkLevel}
                    toolMessage="Click to remove! (˘▾˘)"
                  />
                ))
              : ""}
          </Row>
          <Row className="card-row">
            {this.state.set.length ? (
              <Button onClick={createSet}>Create</Button>
            ) : (
              ""
            )}
          </Row>
          <Row className="card-row">
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Search Problem
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl onChange={updateSearch} />
              <InputGroup.Append>
                <Button variant="secondary" onClick={updateSearch}>
                  <i className="fa fa-search"></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Row>
          <Row className="card-row">{filteredProblems}</Row>
          {/* Pagination is the numbers displayed to navigate through problems */}
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
