import React, { Component } from "react";
import "../index.css";
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as queries from "../graphql/queries";
import { Card, Row, Button, Modal, Table } from "react-bootstrap";

class DisplayProblem extends Component {
  render() {
    return (
      <div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.showModal}
          onHide={this.props.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <a href={"https://leetcode.com/problems/" + this.props.url}>
                {this.props.title}
              </a>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Attempt #</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1/1/2020</td>
                  <td>{this.props.time}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark">Add</Button>
            <Button variant="danger" onClick={this.props.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default DisplayProblem;
