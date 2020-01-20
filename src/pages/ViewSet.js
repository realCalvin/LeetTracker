import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import {
  Row,
  Jumbotron,
  Button,
  Popover,
  OverlayTrigger
} from "react-bootstrap";
import DisplaySetProblems from "../components/CRUD/DisplaySetProblems";
import AddComment from "../components/CRUD/AddComment";
import Navbar from "../components/Navbar";

class ViewSet extends Component {
  state = {
    problems: [],
    baseUrl: ""
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
      var baseUrl = "http://" + window.location.host + "/";
      this.setState({
        problems: setProblems.data.listProblems.items,
        baseUrl: baseUrl
      });
    }
  }
  render() {
    let popover;
    if (this.props.location.state) {
      popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Send Link To Share!</Popover.Title>
          <Popover.Content>
            <a href={this.state.baseUrl + this.props.location.state.id}>
              {this.state.baseUrl + this.props.location.state.id}
            </a>
          </Popover.Content>
        </Popover>
      );
    }
    return (
      <>
        <Navbar page={"sets"} />
        <div className="ViewSet spacing">
          {this.props.location.state ? (
            <>
              <Jumbotron>
                <Row className="card-row">
                  <h1>{this.props.location.state.title}</h1>
                </Row>
                <Row className="card-row">
                  <p>{this.props.location.state.description}</p>
                </Row>
                <Row className="card-row">
                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={popover}
                  >
                    <Button variant="dark" size="sm">
                      <i className="fa fa-share"></i> Share
                    </Button>
                  </OverlayTrigger>
                </Row>
              </Jumbotron>
              {/* Display the set's problems */}
              <DisplaySetProblems
                problems={this.state.problems}
                viewOnly={false}
                id={this.props.location.state.id}
                title={this.props.location.state.title}
                company={this.props.location.state.company}
                description={this.props.location.state.description}
              />
            </>
          ) : (
            <></>
          )}
          <AddComment id={this.props.location.state.id} />
        </div>
      </>
    );
  }
}
export default ViewSet;
