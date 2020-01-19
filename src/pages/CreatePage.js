import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import $ from "jquery";
import { Auth } from "aws-amplify";
import { Row } from "react-bootstrap";
import Navbar from "../components/Navbar";

class CreatePage extends Component {
  componentDidMount() {
    $("#other-company").hide();
  }
  render() {
    const submitSet = e => {
      e.preventDefault();
      var results = $("#setForm").serializeArray();
      // Get current user
      Auth.currentSession().then(data => {
        let token = data.getIdToken();
        // Redirect to the next page to add problems to set
        this.props.history.push({
          pathname: "/create/set",
          state: {
            title: results[0].value,
            description: results[1].value,
            company: results[2].value,
            other: results[3].value,
            author: token.payload["cognito:username"],
            setID:
              token.payload["cognito:username"] +
              "/" +
              Math.floor(Math.random() * 10000000)
          }
        });
      });
    };
    let displayOther = () => {
      $("#other-company").show();
    };
    let closeOther = () => {
      $("#other-company").hide();
    };
    let checkInput = () => {
      let selectedCompany = $("#company").val();
      if (selectedCompany === "Other") {
        displayOther();
      } else {
        closeOther();
      }
    };
    return (
      <div>
        <Navbar />
        <Container className="spacing">
          <Row className="card-row">
            <h1 className="header-spacing">Create New Set</h1>
          </Row>
          <Form id="setForm" onSubmit={submitSet}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter Title"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows="5"
                placeholder="Enter Description"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                id="company"
                as="select"
                name="company"
                required
                onChange={checkInput}
              >
                <option>Facebook</option>
                <option>Amazon</option>
                <option>Google</option>
                <option>Microsoft</option>
                <option>Apple</option>
                <option>Twitter</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="other-company">
              <Form.Label>Other Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company Name"
                name="other"
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Create
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreatePage;
