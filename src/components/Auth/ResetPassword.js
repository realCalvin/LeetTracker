import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Auth } from "aws-amplify";
import $ from "jquery";

class ResetPassword extends Component {
  render() {
    // Function listens to login form and logs in if user is valid
    let handleReset = e => {
      e.preventDefault();
      let data = $("#reset-password-form").serializeArray();
      console.log(data);
      let username = data[0].value;
      let code = data[1].value;
      let p1 = data[2].value;
      let p2 = data[3].value;

      // If both of the new passwords match, we reset the user's password
      if (validatePassword(p1, p2)) {
        Auth.forgotPasswordSubmit(username, code, p1)
          .then(data => {
            $("#hidden-reset-password").css("display", "block");
            $("#hidden-reset-password-error").css("display", "none");
          })
          .catch(err => {
            $("#hidden-reset-password-error").css("display", "block");
            $("#hidden-reset-password-error").html(err.message);
          });
      } else {
        $("#hidden-reset-password-error").css("display", "block");
        $("#hidden-reset-password-error").html("Passwords do not match.");
      }
    };

    // checks if both the passwords are the same
    let validatePassword = (p1, p2) => {
      if (p1 !== p2) {
        return false;
      }
      return true;
    };

    return (
      <Modal
        show={this.props.showResetPassword}
        onHide={this.props.handleResetPasswordClose}
        id="reset-password-modal"
      >
        <Form id="reset-password-form" onSubmit={handleReset}>
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
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                name="password1"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword2">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                name="password2"
                required
              />
            </Form.Group>
            <small id="hidden-reset-password">
              Successfully changed password.
            </small>
            <small id="hidden-reset-password-error"></small>
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
