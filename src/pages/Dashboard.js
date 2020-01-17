import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { Row, Toast, Image } from "react-bootstrap";
import icon from "../components/img/icon.png";

class Dashboard extends Component {
  state = {
    showToast: true
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
    console.log(adminSets);
  }

  render() {
    let toggleToast = () => {
      this.setState({
        showToast: false
      });
    };
    return (
      <div className="Dashboard spacing">
        <Row className="dashboard-row">
          <Toast
            show={this.state.showToast}
            onClose={toggleToast}
            delay={5000}
            autohide
          >
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
        <Row className="dashboard-row">
          <h1>xd</h1>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
