import React, { Component } from "react";
import Pagination from "../components/Pagination";
import {
  Row,
  InputGroup,
  FormControl,
  Button,
  Jumbotron
} from "react-bootstrap";
import DisplayCard from "../components/CRUD/DisplayCard";
import data from "../data.json";
import $ from "jquery";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import Navbar from "../components/Navbar";

class UpdateSet extends Component {
  state = {
    problems: data,
    id: null,
    title: null,
    company: null,
    description: null,
    currentPage: 1,
    problemsPerPage: 54,
    set: []
  };
  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push({ pathname: "/sets" });
    } else {
      this.setState({
        id: this.props.location.state.setID,
        title: this.props.location.state.title,
        company: this.props.location.state.company,
        description: this.props.location.state.description
      });
    }
  }
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
      $("#" + id).click(function() {
        console.log(id);
      });
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
        // Show checkmark on screen to indicate a problem is added
        $("#checkmark-div").fadeIn(400);
        $("#checkmark-div").fadeOut(450);
        set.push({
          id,
          title,
          url,
          level,
          completed: false,
          time: "0",
          setID: this.props.location.state.setID
        });
        this.setState({
          set: set
        });
      } else {
        // Show x mark on screen to indicate a problem is duplicate
        $("#xmark-div").fadeIn(400);
        $("#xmark-div").fadeOut(450);
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

    // Add the selected problems into the user's existing set
    let addProblem = () => {
      // Connecting the selected LeetCode problems to the existing set
      this.state.set.map(async problem => {
        let problemData = {
          title: problem.title,
          url: problem.url,
          level: problem.level,
          completed: problem.completed,
          time: problem.time,
          setID: this.state.id
        };
        // GraphQL call to push data to AWS DynamoDB
        API.graphql(
          graphqlOperation(mutations.createProblem, { input: problemData })
        );
      });
      // Sends user to their sets
      setTimeout(() => {
        this.props.history.push({
          pathname: "/view/set",
          state: {
            id: this.state.id,
            title: this.state.title,
            company: this.state.company,
            description: this.state.description
          }
        });
      }, 500);
    };

    return (
      <>
        {" "}
        <Navbar page={"sets"} />
        <div className="CreateSet spacing">
          {/* Jumbotron displays the current user's set */}
          <div id="checkmark-div">
            <i id="checkmark" className="fa fa-check"></i>
          </div>
          <div id="xmark-div">
            <i id="xmark" className="fa fa-times"></i>
          </div>
          <Jumbotron>
            {this.state.set.length ? (
              ""
            ) : (
              <div>
                <Row className="card-row">
                  <h3>Empty...</h3>
                </Row>
                <Row className="card-row">
                  <p>Add problems by clicking on them!</p>
                </Row>{" "}
              </div>
            )}
            <Row className="card-row">
              {this.state.set.length ? (
                <h3>{this.props.location.state.title}</h3>
              ) : (
                ""
              )}
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
                <Button variant="dark" onClick={addProblem}>
                  Add
                </Button>
              ) : (
                ""
              )}
            </Row>
          </Jumbotron>
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
          <Row className="card-row">
            <Pagination
              problemsPerPage={this.state.problemsPerPage}
              totalProblems={this.state.problems.length}
              paginate={paginate}
            />
          </Row>
          {/* Pagination is the numbers displayed to navigate through problems */}
        </div>
      </>
    );
  }
}
export default UpdateSet;
