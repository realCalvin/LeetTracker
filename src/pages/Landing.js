import React, { Component } from "react";
import pic1 from "../components/img/landing1.svg";
import pic2 from "../components/img/landing2.png";
import {
  Row,
  Col,
  Button,
  Image,
  ProgressBar,
  Tabs,
  Tab,
  Container,
  Form,
  Navbar,
  Nav
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ConfirmCode from "./ConfirmCode";

class Landing extends Component {
  componentDidMount() {
    // view parameters to see if it has been redirected to pop open sign in
    if (this.props.location.search === "?redirect=signin") {
      this.setState({
        showSignIn: true
      });
    }

    Auth.currentSession().then(data => {
      let token = data.getIdToken();
      this.setState({
        user: token.payload["cognito:username"]
      });
    });
  }
  state = {
    key: "home",
    user: null,
    showSignIn: false,
    showSignUp: false,
    showConfirm: false
  };
  render() {
    const setKey = k => {
      this.setState({
        key: k
      });
    };
    // Function to log out current user
    const logOut = () => {
      Auth.signOut()
        .then(window.location.reload())
        .catch(err => console.log(err));
    };

    // Open and close sign in modal
    const handleSignInOpen = () => {
      this.setState({
        showSignIn: true,
        showSignUp: false
      });
    };
    const handleSignInClose = () => {
      this.setState({
        showSignIn: false
      });
    };

    // Open and close sign up modal
    const handleSignUpOpen = () => {
      this.setState({
        showSignUp: true,
        showSignIn: false,
        showConfirm: false
      });
    };
    const handleSignUpClose = () => {
      this.setState({
        showSignUp: false
      });
    };

    // Open and close code confirmation modal
    const handleConfirmOpen = () => {
      this.setState({
        showConfirm: true,
        showSignUp: false
      });
    };
    const handleConfirmClose = () => {
      this.setState({
        showConfirm: false
      });
    };

    return (
      <div className="Landing">
        {/* Sign in and sign up modals below */}
        <SignIn
          showSignIn={this.state.showSignIn}
          handleSignInClose={handleSignInClose}
          handleSignUpOpen={handleSignUpOpen}
        />
        <SignUp
          showSignUp={this.state.showSignUp}
          handleSignUpClose={handleSignUpClose}
          handleSignInOpen={handleSignInOpen}
          handleConfirmOpen={handleConfirmOpen}
        />
        <ConfirmCode
          showConfirm={this.state.showConfirm}
          handleSignUpOpen={handleSignUpOpen}
          handleConfirmClose={handleConfirmClose}
          handleConfirmOpen={handleConfirmOpen}
        />
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
          {this.state.user ? (
            <Nav className="mr-auto">
              <Link className="navbar-link" to="/dashboard">
                Dashboard
              </Link>
              <Link className="navbar-link" to="/create">
                Create
              </Link>
              <Link className="navbar-link" to="/sets">
                Sets
              </Link>
              <Link className="navbar-link" to="/profile">
                Profile
              </Link>
            </Nav>
          ) : (
            ""
          )}
          <Nav className="ml-auto">
            {this.state.user ? (
              <Link className="navbar-link" onClick={logOut} to="">
                Logout
              </Link>
            ) : (
              <div>
                <Link to="#" className="navbar-link" onClick={handleSignInOpen}>
                  Login
                </Link>
                <Link to="#" className="navbar-link" onClick={handleSignUpOpen}>
                  Register
                </Link>
              </div>
            )}
          </Nav>
        </Navbar>
        <div id="landing-page">
          <div className="wave wave1" id="nav-wave"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <Row id="landing-content">
            <Col>
              <div id="landing-content-1">
                <h1>LeetTracker</h1>
                <p>Find sets of problems and track your progress</p>
                <Button variant="outline-light" href="#nav-wave">
                  Get Started
                </Button>
              </div>
              <div id="landing-content-2">
                <Image id="landing-pic1" src={pic1} alt="Landing Pic" fluid />
              </div>
            </Col>
          </Row>
        </div>
        <div id="landing-page2">
          <Row id="landing-description">
            <Col id="landing-description1">
              <Image id="landing-pic2" src={pic2} alt="Landing Pic" fluid />
            </Col>
            <Col id="landing-description2">
              <Image id="landing-pic3" src={pic2} alt="Landing Pic1" fluid />
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                activeKey={this.state.key}
                onSelect={k => setKey(k)}
              >
                <Tab
                  className="tab-content-description"
                  eventKey="home"
                  title="LeetTracker"
                >
                  LeetTracker is an application that allows users to create
                  their own LeetCode set and track their progress. These sets
                  can be company targeted, or for personal usage to get better
                  at coding interviews
                </Tab>
                <Tab
                  className="tab-content-description"
                  eventKey="getStarted"
                  title="Get Started"
                >
                  Create an account and sign in to start using our services
                </Tab>
                <Tab
                  className="tab-content-description"
                  eventKey="nextStep"
                  title="Next Step"
                >
                  Build your own LeetCode practice set or view existing sets
                  built by other users (coming soon...)
                </Tab>
                <Tab
                  className="tab-content-description"
                  eventKey="lastStep"
                  title="Last Step"
                >
                  Track your progress and improve your problem solving skills to
                  land that internship/job
                  <ProgressBar id="landing-progress" animated now={70} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
          <div className="dark-wave wave1"></div>
          <div className="dark-wave wave2"></div>
          <div className="dark-wave wave3"></div>
        </div>
        <div className="contact-page">
          <Container id="contact-container">
            <Row className="" id="contact-label">
              <h1>Contact Us</h1>
            </Row>
            <Row id="contact-us" className="justify-content-md-center">
              <Form id="contact-form">
                <Form.Group name="name">
                  <Form.Control type="text" placeholder="Name" required />
                </Form.Group>
                <Form.Group name="email">
                  <Form.Control type="text" placeholder="Email" required />
                </Form.Group>
                <Form.Group name="message">
                  <Form.Control
                    id="form-textarea"
                    as="textarea"
                    rows="3"
                    placeholder="Message"
                    required
                  />
                </Form.Group>
                <Button variant="primary" size="sm" type="submit">
                  Submit
                </Button>
              </Form>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default Landing;
