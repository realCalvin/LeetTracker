import React, { Component } from "react";
import "../index.css";
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as queries from "../graphql/queries";
import { Card, Row, Button, Spinner } from "react-bootstrap";

class ViewSets extends Component {
  state = {
    userSets: [],
    loaded: false,
    created: false
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
        },
        limit: 1000
      })
    );
    console.log(userSets);
    this.setState({
      userSets: userSets.data.listSets.items,
      loaded: true
    });
  }

  render() {
    let ViewSets = (id, title, company, description) => {
      this.props.history.push({
        pathname: "/view/set",
        state: {
          id: id,
          title: title,
          company: company,
          description: description
        }
      });
    };

    // Function to query for company name & image
    let companyImage = company => {
      if (company === "No Company") {
        return "No Company";
      } else if (
        company === "Google" ||
        company === "Amazon" ||
        company === "Facebook" ||
        company === "Twitter" ||
        company === "Apple" ||
        company === "Microsoft"
      ) {
        return company;
      } else {
        return "Other";
      }
    };
    let sets = this.state.userSets.map(set => {
      // Set the company image for a set
      let companyName = companyImage(set.company);
      let otherCompany = false;
      if (
        set.company !== "Google" &&
        set.company !== "Amazon" &&
        set.company !== "Facebook" &&
        set.company !== "Twitter" &&
        set.company !== "Apple" &&
        set.company !== "Microsoft" &&
        set.company !== "No Company"
      ) {
        otherCompany = true;
      }
      return (
        <Card className="set-card" key={set.id} style={{ width: "15rem" }}>
          <Card.Img
            variant="top"
            src={require("../components/img/" + companyName + ".png")}
            height="250px"
            width="170px"
          />
          {otherCompany ? (
            <div id="other-company-label">
              <h3>{set.company}</h3>
            </div>
          ) : (
            ""
          )}
          <Card.Body>
            <Card.Title>{set.title}</Card.Title>
            <Button
              className="view-sets-btn"
              variant="dark"
              onClick={() => {
                ViewSets(set.id, set.title, set.company, set.description);
              }}
            >
              View Set
            </Button>
          </Card.Body>
        </Card>
      );
    });
    return (
      <div className="Profile spacing">
        <Row className="card-row">
          <h1 className="header-spacing">Sets</h1>
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
