import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import $ from "jquery";

class CreatePage extends Component {
  render() {
    const submitSet = e => {
      e.preventDefault();
      var results = $("#setForm").serializeArray();
      this.props.history.push({
        pathname: "/create/set",
        state: {
          title: results[0].value,
          description: results[1].value,
          company: results[2].value
        }
      });
    };
    return (
      <div>
        <Container>
          <h1>Create New Set</h1>
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
              <Form.Control name="company" type="text" placeholder="Optional" />
            </Form.Group>
            <Button type="submit">Create</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreatePage;
