import React, { Component } from "react";
import { Row, Button, Container, Form, Navbar } from "react-bootstrap";
import { Auth } from "aws-amplify";

class SignIn extends Component {
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
        <div id="landing-page">
          <div className="wave wave1" id="nav-wave"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="contact-page">
            <Container id="login-container">
              <Row className="" id="login-label">
                <h1>Login</h1>
              </Row>
              <Row id="login-us" className="justify-content-md-center">
                <Form id="login-form">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      name="username"
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
                  <Button variant="primary" type="submit" size="sm">
                    Login
                  </Button>
                  <Row id="login-small">
                    <small>
                      <a href="/forgot">Forgot password</a> ·{" "}
                      <a href="/register">Register</a>
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
export default SignIn;
