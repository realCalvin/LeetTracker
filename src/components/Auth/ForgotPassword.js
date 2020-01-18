import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Auth } from "aws-amplify";
import $ from "jquery";

class ForgotPassword extends Component {
  render() {
    // Function listens to reset form and sends user a confirmation code needed to reset password
    let handleSendReset = e => {
      e.preventDefault();
      let data = $("#forgot-password-form").serializeArray();
      let username = data[0].value;
      Auth.forgotPassword(username)
        .then(data => {
          $("#hidden-forgot-password").css("display", "block");
          $("#hidden-forgot-password-error").css("display", "none");
        })
        .catch(err => {
          $("#hidden-forgot-password").css("display", "none");
          $("#hidden-forgot-password-error").css("display", "block");
        });
    };

    return (
      /* Model used to send a confirmation code to reset password */
      <Modal
        show={this.props.showForgotPassword}
        onHide={this.props.handleForgotPasswordClose}
        id="forgot-password-modal"
      >
        <Form id="forgot-password-form" onSubmit={handleSendReset}>
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
            <small id="hidden-forgot-password">
              Confirmation code has been sent to your email.
            </small>
            <small id="hidden-forgot-password-error">
              Error. Enter a valid username.
            </small>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleSignInOpen}>
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
export default ForgotPassword;
