import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Auth } from "aws-amplify";
import $ from "jquery";

class ForgotPassword extends Component {
  render() {
    // Function listens to login form and logs in if user is valid
    let handleReset = e => {
      e.preventDefault();
      let data = $("#confirm-form").serializeArray();
    };

    return (
      <Modal
        show={this.props.showForgotPassword}
        onHide={this.props.handleForgotPasswordClose}
        id="forgot-password-modal"
      >
        <Form id="confirm-form" onSubmit={handleReset}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Button variant="link" className="underline auth-label">
                Forgot Password
              </Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicCode">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                required
              />
            </Form.Group>
            <small>
              After receiving your code...{" "}
              <Button
                variant="link"
                className="small-link"
                onClick={this.props.handleResetPasswordOpen}
              >
                Click here
              </Button>
            </small>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleSignInOpen}>
              Back
            </Button>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
export default ForgotPassword;
