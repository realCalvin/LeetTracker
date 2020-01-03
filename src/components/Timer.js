import React, { Component } from "react";
import "../index.css";
import {
  Card,
  Row,
  Button,
  Modal,
  Table,
  FormControl,
  Alert
} from "react-bootstrap";

class DisplayProblem extends Component {
  state = {
    status: true,
    timerStart: 0,
    timerTime: 0
  };
  // Function to start timer
  startTimer = () => {
    this.setState({
      status: false,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };
  // Function to stop timer
  stopTimer = () => {
    this.setState({
      status: true
    });
    clearInterval(this.timer);
  };
  // Function to reset timer
  resetTimer = () => {
    this.stopTimer();
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
    console.log(this.state);
  };
  render() {
    const { timerTime } = this.state;
    // Calculate seconds & minutes, given milliseconds
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    return (
      <Alert id="timer" variant="light">
        <div>
          <Alert.Heading>
            {minutes}:{seconds}
          </Alert.Heading>
          {this.state.status ? (
            <Button
              variant="outline-success"
              size="sm"
              onClick={this.startTimer}
            >
              Start
            </Button>
          ) : (
            <Button variant="outline-danger" size="sm" onClick={this.stopTimer}>
              Stop
            </Button>
          )}
          <Button variant="outline-dark" size="sm" onClick={this.resetTimer}>
            Reset
          </Button>
        </div>
      </Alert>
    );
  }
}
export default DisplayProblem;
