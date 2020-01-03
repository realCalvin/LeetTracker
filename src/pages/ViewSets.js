import React, { Component } from "react";
import "../index.css";
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as queries from "../graphql/queries";
import { Card, Row, Button, Spinner } from "react-bootstrap";

class ViewSets extends Component {
  state = {
    userSets: [],
    loaded: false
  };
  async componentDidMount() {
    let data = await Auth.currentSession();
    var token = await data.getIdToken();
    let userSets = await API.graphql(
      graphqlOperation(queries.listSets, {
        filter: {
          author: {
            eq: token.payload["cognito:username"]
          }
        }
      })
    );
    this.setState({
      userSets: userSets.data.listSets.items,
      loaded: true
    });
  }

  render() {
    let ViewSets = (id, title, company) => {
      this.props.history.push({
        pathname: "/view/set",
        state: {
          id: id,
          title: title,
          company: company
        }
      });
    };
    let sets = this.state.userSets.map(set => {
      return (
        <Card className="set-card" key={set.id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{set.title}</Card.Title>
            {set.company ? (
              <Card.Subtitle className="mb-2 text-muted">
                {set.company}
              </Card.Subtitle>
            ) : (
              ""
            )}
            <Card.Text>{set.description}</Card.Text>
            <Button
              variant="dark"
              onClick={() => {
                ViewSets(set.id, set.title, set.company);
              }}
            >
              View Set
            </Button>
          </Card.Body>
        </Card>
      );
    });
    return (
      <div className="Profile">
        <Row className="card-row">
          <h1>Sets</h1>
        </Row>
        <Row className="card-row">
          {this.state.loaded ? (
            sets.length ? (
              sets
            ) : (
              <h4>Empty...</h4>
            )
          ) : (
            <Spinner animation="border" variant="dark" />
          )}
        </Row>
      </div>
    );
  }
}
export default ViewSets;
