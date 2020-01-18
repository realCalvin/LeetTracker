import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Auth } from "aws-amplify";
import $ from "jquery";

class ResetPassword extends Component {
  render() {
    // Function listens to login form and logs in if user is valid
    let handleReset = e => {
      e.preventDefault();
      let data = $("#confirm-form").serializeArray();
    };

    return (
      <Modal
        show={this.props.showResetPassword}
        onHide={this.props.handleResetPasswordClose}
        id="reset-password-modal"
      >
        <Form id="confirm-form" onSubmit={handleReset}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Button variant="link" className="underline auth-label">
                Reset Password
              </Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicUsername">
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
                placeholder="Enter Code"
                name="code"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter New Password"
                name="password1"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Confirm New Password"
                name="password2"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.props.handleForgotPasswordOpen}
            >
              Back
            </Button>
            <Button variant="primary" type="submit">
              Reset
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
export default ResetPassword;
