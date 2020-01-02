import React, { Component } from "react";
import "../index.css";
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as queries from "../graphql/queries";
import { Card, Row, Button } from "react-bootstrap";
import DisplaySetProblems from "../components/DisplaySetProblems";

class ViewSets extends Component {
  state = {
    problems: []
  };
  async componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push({ pathname: "/sets" });
    } else {
      // Retrieve list of problems for the set that is clicked on
      let setProblems = await API.graphql(
        graphqlOperation(queries.listProblems, {
          // limit of 1000 problems & filtered via set
          limit: 1000,
          filter: {
            setID: {
              eq: this.props.location.state.id
            }
          }
        })
      );
      this.setState({
        problems: setProblems.data.listProblems.items
      });
    }
  }
  render() {
    return (
      <div className="Profile">
        <h1>Set</h1>
        {/* Display the set's problems */}
        <DisplaySetProblems problems={this.state.problems} />
      </div>
    );
  }
}
export default ViewSets;
