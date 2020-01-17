import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Button,
  Table,
  Spinner,
  Badge,
  Form,
  Dropdown,
  Modal
} from "react-bootstrap";
import DisplayProblem from "./DisplayProblem";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import $ from "jquery";

class DisplaySetProblems extends Component {
  state = {
    problems: [],
    times: [],
    loaded: false,
    showModal: false,
    showDeleteModal: false,
    id: "",
    setID: "",
    title: "",
    url: "",
    level: "",
    time: ""
  };
  async componentDidMount() {
    console.log(this.props.problems);
  }
  async componentDidUpdate() {
    if (this.state.loaded === false) {
      this.setState({
        problems: this.props.problems,
        loaded: true
      });
    }
  }

  render() {
    // Toggle modal for the problem that the user clicked on & retrieve the problem's info
    let showProblem = (id, setID, title, url, level, time) => {
      // Function below is used to sort an array of objects based on the attritude, "createdAt"
      // Function is referenced from stackoverflow
      var sortBy = (function() {
        var toString = Object.prototype.toString,
          // default parser function
          parse = function(x) {
            return x;
          },
          // gets the item to be sorted
          getItem = function(x) {
            var isObject = x != null && typeof x === "object";
            var isProp = isObject && this.prop in x;
            return this.parser(isProp ? x[this.prop] : x);
          };

        return function sortby(array, cfg) {
          if (!(array instanceof Array && array.length)) return [];
          if (toString.call(cfg) !== "[object Object]") cfg = {};
          if (typeof cfg.parser !== "function") cfg.parser = parse;
          cfg.desc = !!cfg.desc ? -1 : 1;
          return array.sort(function(a, b) {
            a = getItem.call(cfg, a);
            b = getItem.call(cfg, b);
            return cfg.desc * (a < b ? -1 : +(a > b));
          });
        };
      })();
      // API call used to grab the problem's times and set the state
      API.graphql(
        graphqlOperation(queries.listTimes, {
          filter: {
            problemID: {
              eq: id
            }
          },
          limit: 1000
        })
      ).then(res => {
        // Retrieve the data from result & sorts it via createdAt
        let times = res.data.listTimes.items;
        sortBy(times, { prop: "createdAt" });
        this.setState({
          times: times,
          showModal: true,
          id: id,
          setID: setID,
          title: title,
          url: url,
          level: level,
          time: time
        });
        console.log(this.state.times);
      });
    };

    // Toggle modal to close
    let closeModal = () => {
      this.setState({
        showModal: false
      });
    };

    // Toggle delete modal to close
    let closeDeleteModal = () => {
      this.setState({
        showDeleteModal: false
      });
    };
    // Toggle delete modal to open
    let openDeleteModal = () => {
      if ($("#display-set-form").serializeArray().length) {
        this.setState({
          showDeleteModal: true
        });
      }
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
            <td className="table-action-check">
              <Form.Check type="checkbox" name={problem.id} />
            </td>
            <td>
              <a
                href={"https://leetcode.com/problems/" + problem.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {problem.title}
              </a>
            </td>
            <td>{level}</td>
            {/* Display the best time and "view" if it was not shared by the user via a link */}
            {this.props.viewOnly ? (
              <></>
            ) : (
              <>
                <td>{problem.time}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    id={problem.id}
                    onClick={() => {
                      showProblem(
                        problem.id,
                        problem.setID,
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
              </>
            )}
          </tr>
        );
      });
    }

    // Function reads the checkboxes & handles the deletion from DynamoDB
    async function handleDelete() {
      let problems = $("#display-set-form").serializeArray();
      for (var i = 0; i < problems.length; i++) {
        await API.graphql(
          graphqlOperation(mutations.deleteProblem, {
            input: {
              id: problems[i].name
            }
          })
        );
      }
      window.location.reload();
    }

    // Function routes the user to an update page where they can select problems to add
    let handleAdd = () => {
      console.log(this.props.location.state.id);
      this.props.history.push({
        pathname: "/update/set",
        state: {
          setID: this.props.location.state.id,
          title: this.props.location.state.title,
          company: this.props.location.state.company,
          description: this.props.location.state.description
        }
      });
    };

    return (
      <Row id="view-set-row" className="card-row">
        <Modal
          show={this.state.showDeleteModal}
          onHide={closeDeleteModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeDeleteModal}>
              No
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        {this.state.loaded ? (
          <Form id="display-set-form">
            <Table striped bordered hover id="set-problem-table">
              <thead>
                <tr>
                  <th id="table-action-header">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="outline-dark"
                        id="dropdown-basic"
                        size="sm"
                      >
                        Action
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleAdd}>Add</Dropdown.Item>
                        <Dropdown.Item onClick={openDeleteModal}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </th>
                  <th>Problems</th>
                  <th>Difficulty</th>
                  {this.props.viewOnly ? (
                    <></>
                  ) : (
                    <>
                      <th>Best Time</th>
                      <th>View</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>{problems}</tbody>
            </Table>
          </Form>
        ) : (
          <Spinner animation="border" variant="dark" />
        )}
        <DisplayProblem
          times={this.state.times}
          showModal={this.state.showModal}
          closeModal={closeModal}
          setID={this.state.setID}
          id={this.state.id}
          title={this.state.title}
          url={this.state.url}
          level={this.state.level}
          time={this.state.time}
          showProblem={showProblem}
        />
      </Row>
    );
  }
}
export default withRouter(DisplaySetProblems);
