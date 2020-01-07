import React, { Component } from "react";
import "../index.css";
import { Row, Button, Table, Spinner, Badge } from "react-bootstrap";
import DisplayProblem from "../components/DisplayProblem";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

class DisplaySetProblems extends Component {
  state = {
    problems: [],
    times: [],
    loaded: false,
    showModal: false,
    id: "",
    setID: "",
    title: "",
    url: "",
    level: "",
    time: ""
  };
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
export default DisplaySetProblems;
