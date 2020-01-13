import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Auth } from "aws-amplify";
import $ from "jquery";
class SignUp extends Component {
  state = {
    passwordEqual: true,
    passwordLength: true
  };
  render() {
    // checks if both the passwords are the same
    let validatePassword = (p1, p2) => {
      if (p1.length < 6 || p2.length < 6) {
        this.setState({
          passwordLength: false
        });
        return false;
      }
      if (p1 !== p2) {
        this.setState({
          passwordEqual: false
        });
        return false;
      }
      return true;
    };

    // Function listens to register form and signs up a user
    let handleRegister = e => {
      e.preventDefault();
      this.setState({
        passwordEqual: true,
        passwordLength: true
      });
      let data = $("#register-form").serializeArray();
      console.log(data);
      // If both passwords are valid and equal... then sign up
      if (validatePassword(data[2].value, data[3].value)) {
        let username = data[0].value;
        let email = data[1].value;
        let password = data[2].value;
        Auth.signUp(username, password, email)
          .then(res => this.props.handleConfirmOpen(), console.log("signed up"))
          .catch(err => alert(err.message));
      }
    };
    return (
      <Modal
        show={this.props.showSignUp}
        onHide={this.props.handleSignUpClose}
        id="register-modal"
      >
        <Form id="register-form" onSubmit={handleRegister}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Button
                className="auth-label"
                variant="link"
                onClick={this.props.handleSignInOpen}
              >
                Login
              </Button>
              <Button className="auth-label underline" variant="link">
                Register
              </Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicUser2">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                required
              />
              {this.state.passwordEqual ? (
                ""
              ) : (
                <small className="password-error">
                  Passwords do not match.{" "}
                </small>
              )}
              {this.state.passwordLength ? (
                ""
              ) : (
                <small className="password-error">
                  Passwords must be at least 6 characters.{" "}
                </small>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicPassword4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirm"
                required
              />
              {this.state.passwordEqual ? (
                ""
              ) : (
                <small className="password-error">
                  Passwords do not match.{" "}
                </small>
              )}
              {this.state.passwordLength ? (
                ""
              ) : (
                <small className="password-error">
                  Passwords must be at least 6 characters.{" "}
                </small>
              )}
            </Form.Group>
            <small>
              Need to confirm an account?{" "}
              <Button
                variant="link"
                className="small-link"
                onClick={this.props.handleConfirmOpen}
              >
                Click here
              </Button>
            </small>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
export default SignUp;
