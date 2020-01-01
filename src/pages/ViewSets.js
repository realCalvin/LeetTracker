import React, { Component } from "react";
import "../index.css";
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as queries from "../graphql/queries";
import { Card, Row, Button } from "react-bootstrap";

class ViewSets extends Component {
  state = {
    userSets: []
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
      userSets: userSets.data.listSets.items
    });
  }

  render() {
    let ViewSets = id => {
      console.log(id);
      this.props.history.push({
        pathname: "/view/set",
        state: {
          id: id
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
              variant="primary"
              onClick={() => {
                ViewSets(set.id);
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
        <h1>Sets</h1>
        <Row className="card-row">{sets}</Row>
      </div>
    );
  }
}
export default ViewSets;
