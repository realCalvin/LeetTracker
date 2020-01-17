import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Auth } from "aws-amplify";
import $ from "jquery";

class ConfirmCode extends Component {
  render() {
    // Function listens to login form and logs in if user is valid
    let handleConfirm = e => {
      e.preventDefault();
      let data = $("#confirm-form").serializeArray();
      let username = data[0].value;
      let code = data[1].value;
      Auth.confirmSignUp(username, code)
        .then(data => window.location.reload())
        .catch(err => alert(err.message));
    };

    return (
      <Modal
        show={this.props.showConfirm}
        onHide={this.props.handleConfirmClose}
        id="confirm-modal"
      >
        <Form id="confirm-form" onSubmit={handleConfirm}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Button variant="link" className="underline auth-label">
                Confirm Account
              </Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicUsername3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicCode">
              <Form.Label>Confirmation Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Code From Email"
                name="code"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleSignUpOpen}>
              Back
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
export default ConfirmCode;
