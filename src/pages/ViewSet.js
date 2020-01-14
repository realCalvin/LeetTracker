import React, { Component } from "react";
import "../index.css";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import {
  Row,
  Jumbotron,
  Button,
  Popover,
  OverlayTrigger
} from "react-bootstrap";
import DisplaySetProblems from "../components/DisplaySetProblems";

class ViewSet extends Component {
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
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Send Link To Share!</Popover.Title>
        <Popover.Content>
          <a href={"http://localhost:3000/" + this.props.location.state.id}>
            {"http://localhost:3000/" + this.props.location.state.id}
          </a>
        </Popover.Content>
      </Popover>
    );
    return (
      <div className="ViewSet spacing">
        <Jumbotron>
          <Row className="card-row">
            <h1>{this.props.location.state.title}</h1>
          </Row>
          <Row className="card-row">
            <p>{this.props.location.state.description}</p>
          </Row>
          <Row className="card-row">
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
              <Button variant="dark" size="sm">
                <i className="fa fa-share"></i> Share
              </Button>
            </OverlayTrigger>
          </Row>
        </Jumbotron>
        {/* Display the set's problems */}
        <DisplaySetProblems problems={this.state.problems} viewOnly={false} />
      </div>
    );
  }
}
export default ViewSet;
