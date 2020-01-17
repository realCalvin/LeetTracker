import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Auth } from "aws-amplify";
import $ from "jquery";

class SignIn extends Component {
  // Function to check if a user is authenticated
  async isAuthenticated() {
    await Auth.currentAuthenticatedUser()
      .then(user => (window.location = "/"))
      .catch(err => console.log(err));
  }
  render() {
    // Function listens to login form and logs in if user is valid
    let handleLogin = e => {
      e.preventDefault();
      let data = $("#login-form").serializeArray();
      let username = data[0].value;
      let password = data[1].value;
      Auth.signIn(username, password)
        .then(res => this.isAuthenticated())
        .catch(err => alert(err.message));
    };

    return (
      <Modal
        show={this.props.showSignIn}
        onHide={this.props.handleSignInClose}
        id="login-modal"
      >
        <Form id="login-form" onSubmit={handleLogin}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Button variant="link" className="underline auth-label">
                Login
              </Button>
              <Button
                variant="link"
                onClick={this.props.handleSignUpOpen}
                className="auth-label"
              >
                Register
              </Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicUsername1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Forgot Password</Button>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
export default SignIn;
