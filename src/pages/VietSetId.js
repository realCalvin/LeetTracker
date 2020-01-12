import React, { Component } from "react";
import "../index.css";
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {
  Row,
  Jumbotron,
  Button,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import DisplaySetProblems from "../components/DisplaySetProblems";

class ViewSet extends Component {
  state = {
    title: "",
    description: "",
    company: "",
    author: "",
    currentUser: "",
    problems: []
  };
  async componentDidMount() {
    let data = await Auth.currentSession();
    var token = await data.getIdToken();
    // Retrieve title and description of the set
    let infoSet = await API.graphql(
      graphqlOperation(queries.getSet, {
        id: this.props.match.params.id
      })
    );
    if (infoSet.data.getSet === null) {
      this.props.history.push({ pathname: "/sets" });
    } else {
      // Retrieve list of problems for the set that is clicked on
      let setProblems = await API.graphql(
        graphqlOperation(queries.listProblems, {
          // limit of 1000 problems & filtered via set
          limit: 1000,
          filter: {
            setID: {
              eq: this.props.match.params.id
            }
          }
        })
      );
      this.setState({
        title: infoSet.data.getSet.title,
        description: infoSet.data.getSet.description,
        company: infoSet.data.getSet.company,
        author: infoSet.data.getSet.author,
        problems: setProblems.data.listProblems.items,
        currentUser: token.payload["cognito:username"]
      });
      console.log(this.state);
    }
  }

  render() {
    let cloneSet = () => {
      // Data for the current user's set
      let setId = this.state.currentUser + Math.floor(Math.random() * 10000000);
      let setData = {
        id: setId,
        author: this.state.currentUser,
        title: this.state.title,
        description: this.state.description,
        company: this.state.company
      };
      // GraphQL call to push data to AWS DynamoDB
      API.graphql(graphqlOperation(mutations.createSet, { input: setData }));

      // Connecting the selected LeetCode problems to the newly created set
      this.state.problems.map(async problem => {
        let problemData = {
          title: problem.title,
          url: problem.url,
          level: problem.level,
          completed: problem.completed,
          time: 0,
          setID: setId
        };
        // GraphQL call to push data to AWS DynamoDB
        API.graphql(
          graphqlOperation(mutations.createProblem, { input: problemData })
        );
      });
      // Sends user to their sets
      setTimeout(() => {
        this.props.history.push("/sets");
      }, 600);
    };
    return (
      <div className="Profile">
        <Jumbotron>
          <Row className="card-row">
            <h1>{this.state.title}</h1>
          </Row>
          <Row className="card-row">
            <p>{this.state.description}</p>
          </Row>
          {this.state.author !== this.state.currentUser ? (
            <Row className="card-row">
              <OverlayTrigger
                placement={"right"}
                overlay={<Tooltip>Add to your list of sets</Tooltip>}
              >
                <Button variant="dark" size="sm" onClick={cloneSet}>
                  <i className="fa fa-clone"></i> Clone
                </Button>
              </OverlayTrigger>
            </Row>
          ) : (
            ""
          )}
        </Jumbotron>
        {/* Display the set's problems */}
        <DisplaySetProblems problems={this.state.problems} viewOnly={true} />
      </div>
    );
  }
}
export default ViewSet;
