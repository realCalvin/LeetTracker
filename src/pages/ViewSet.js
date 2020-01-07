import React, { Component } from "react";
import "../index.css";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { Row, Jumbotron } from "react-bootstrap";
import DisplaySetProblems from "../components/DisplaySetProblems";

class ViewSets extends Component {
  state = {
    problems: []
  };
  async componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push({ pathname: "/sets" });
    } else {
      console.log(this.props.location.state);
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
      console.log(this.state.problems);
    }
  }
  render() {
    return (
      <div className="Profile">
        <Jumbotron>
          <Row className="card-row">
            <h1>{this.props.location.state.title}</h1>
          </Row>
          <Row className="card-row">
            <p>{this.props.location.state.description}</p>
          </Row>
        </Jumbotron>
        {/* Display the set's problems */}
        <DisplaySetProblems problems={this.state.problems} />
      </div>
    );
  }
}
export default ViewSets;
