import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { Row, Toast, Image, Card, Button, Spinner } from "react-bootstrap";
import icon from "../components/img/icon.png";
import $ from "jquery";
import Navbar from "../components/Navbar";

class Dashboard extends Component {
  state = {
    showToast: true,
    sets: [],
    loaded: false
  };

  async componentDidMount() {
    let adminSets = await API.graphql(
      graphqlOperation(queries.listSets, {
        // limit of 1000 problems & filtered via set
        limit: 1000,
        filter: {
          author: {
            eq: "admin"
          }
        }
      })
    );
    this.setState({
      sets: adminSets.data.listSets.items,
      loaded: true
    });
    setTimeout(() => {
      $(".dashboard-row").animate(
        {
          opacity: 0
        },
        3000,
        function() {
          $(".dashboard-row").css("display", "none");
        }
      );
    }, 8000);
  }

  render() {
    let ViewSet = id => {
      this.props.history.push("/view/" + id);
    };

    // Closes toast if user clicks "X"
    let toggleToast = () => {
      this.setState({
        showToast: false
      });
      $(".dashboard-row").css("display", "none");
    };

    let sets = this.state.sets.map(set => {
      return (
        <Card
          className="dashboard-set-card"
          key={set.id}
          style={{ width: "15rem" }}
        >
          <Card.Img
            variant="top"
            src={require("../components/img/" + set.title + ".png")}
            height="250px"
            width="170px"
          />
          <Card.Body>
            <Card.Title>{set.title}</Card.Title>
            <Button
              className="view-sets-btn"
              variant="dark"
              onClick={() => {
                ViewSet(set.id);
              }}
              size="sm"
            >
              View Set
            </Button>
          </Card.Body>
        </Card>
      );
    });

    return (
      <>
        <Navbar />
        <div className="Dashboard spacing">
          <Row className="dashboard-row">
            <Toast show={this.state.showToast} onClose={toggleToast}>
              <Toast.Header>
                <Image
                  src={icon}
                  alt="Icon"
                  className="rounded mr-2"
                  fluid
                  id="icon"
                />
                <strong className="mr-auto">Get Started</strong>
                <small>1 min ago</small>
              </Toast.Header>
              <Toast.Body>Feel free to use the existing sets below!</Toast.Body>
            </Toast>
          </Row>
          <Row className="dashboard-sets">
            {this.state.loaded ? (
              sets.length ? (
                sets
              ) : (
                <h4>Empty...</h4>
              )
            ) : (
              <Spinner animation="border" variant="light" />
            )}
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
