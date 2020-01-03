import React, { Component } from "react";
import "../index.css";
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {
  Card,
  Row,
  Button,
  Modal,
  Table,
  FormControl,
  Alert,
  Form
} from "react-bootstrap";
import Timer from "../components/Timer";
import $ from "jquery";

class DisplayProblem extends Component {
  state = {
    times: [],
    input: null,
    showAlert: false,
    showTimer: false,
    showError: false
  };
  getTime = true;
  componentDidUpdate() {
    // API call used to grab the problem's times and set the state
    if (this.props.id) {
      API.graphql(
        graphqlOperation(queries.listTimes, {
          filter: {
            problemID: {
              eq: this.props.id
            }
          },
          limit: 1000,
          sortDirection: "DESC"
        })
      ).then(res => {
        console.log(res);
        if (this.getTime) {
          this.setState({
            times: res.data.listTimes.items
          });
        }
      });
    }
  }
  // Unmount to prevent data leak
  componentWillUnmount() {
    this.getTime = false;
  }

  render() {
    // Function used to dynamically add input to modal on user click
    let addInput = id => {
      $(".problem-input").show();
      var d = new Date();
      let temp = (
        <tr className="problem-input">
          <td>#</td>
          <td>
            {d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear()}
          </td>
          <td id="problem-time-input">
            <FormControl
              id="user-time-input"
              placeholder="Time (min:sec)"
              aria-label="Time"
              aria-describedby="user-time"
              name="time"
              size="sm"
              maxLength="5"
            />
          </td>
        </tr>
      );
      this.setState({
        input: temp,
        showAlert: true,
        showTimer: true
      });
    };
    // Updated close function to clear the "input" field in state
    let updatedClose = () => {
      this.setState({
        input: null,
        showAlert: false,
        showTimer: false,
        showError: false
      });
      this.props.closeModal();
    };
    // Toggles the alert in the modal
    let toggleAlert = alert => {
      this.setState({
        [alert]: false
      });
    };
    // Function used to read time input & send to AWS database
    let submitInput = id => {
      // Checks if the user's input is valid minute:second
      let time = $("#user-time-input").val();
      var isValid = /^(|0?[0-9]|[0-6][0-9]):([0-5][0-9]|6[0])?$/.test(time);
      if (!isValid) {
        toggleAlert("showAlert");
        this.setState({
          showError: true
        });
      } else {
        toggleAlert("showError");
        // Data for the current problem
        var d = new Date();
        var date = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        let setData = {
          problemID: id,
          time: time,
          date: date
        };
        // GraphQL call to push data to AWS DynamoDB
        API.graphql(graphqlOperation(mutations.createTime, { input: setData }));
        $(".problem-input").hide();
        this.setState({
          showTimer: false,
          showAlert: false
        });
      }
    };

    return (
      <div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.showModal}
          onHide={updatedClose}
          id="problem-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <a href={"https://leetcode.com/problems/" + this.props.url}>
                {this.props.title}
              </a>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Table displays all the set's problems */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Attempt #</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {this.state.times.map((time, index) => {
                  return (
                    <tr key={time.id}>
                      <td>{index + 1}</td>
                      <td>{time.date}</td>
                      <td>{time.time}</td>
                    </tr>
                  );
                })}
                {this.state.input}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            {this.state.showTimer ? (
              <Button
                variant="success"
                onClick={() => {
                  submitInput(this.props.id);
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="dark"
                onClick={() => {
                  addInput(this.props.id);
                }}
              >
                Add
              </Button>
            )}
            <Button variant="danger" onClick={updatedClose}>
              Close
            </Button>
          </Modal.Footer>
          <Row className="card-row">
            <Modal.Footer>
              <Alert
                variant="success"
                show={this.state.showAlert}
                onClose={() => toggleAlert("showAlert")}
                dismissible
              >
                <Alert.Heading>
                  Tip: Try to finish within an hour! :)
                </Alert.Heading>
                <p>Feel free to use the timer</p>
              </Alert>
              <Alert
                variant="danger"
                show={this.state.showError}
                onClose={() => toggleAlert("showError")}
                dismissible
              >
                <Alert.Heading>Error - Time Format</Alert.Heading>
                <p>Correct format (example: 03:24, 46:15, 9:08)</p>
              </Alert>
              {this.state.showTimer ? <Timer /> : ""}
            </Modal.Footer>
          </Row>
        </Modal>
      </div>
    );
  }
}
export default DisplayProblem;
