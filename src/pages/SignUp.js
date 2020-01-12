import React, { Component } from "react";
import { Row, Button, Container, Form, Navbar } from "react-bootstrap";
import { Auth } from "aws-amplify";

class SignUp extends Component {
  componentDidMount() {
    // check if user is already signed in.. if so, redirect to landing page
    Auth.currentSession().then(data => {
      let token = data.getIdToken();
      if (token.payload["cognito:username"]) {
        this.props.history.push("/");
      }
    });
  }
  render() {
    return (
      <div className="Landing">
        <Navbar
          id="landing-navbar"
          className="navbar transparent navbar-inverse"
          variant="dark"
        >
          <Navbar.Brand>
            <a href="/" className="navbar-brand">
              LeetTracker
            </a>
          </Navbar.Brand>
        </Navbar>
        <div id="landing-page" className="register-page">
          <div className="wave signup-wave wave1" id="nav-wave"></div>
          <div className="wave signup-wave wave2"></div>
          <div className="wave signup-wave wave3"></div>
          <div className="contact-page">
            <Container id="register-container">
              <Row className="" id="register-label">
                <h1>Register</h1>
              </Row>
              <Row id="register-us" className="justify-content-md-center">
                <Form id="register-form">
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      name="username"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="confirm"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" size="sm">
                    Register
                  </Button>
                  <Row id="register-small">
                    <small>
                      Have an account? <a href="/login">Login</a>
                    </small>
                  </Row>
                </Form>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;
