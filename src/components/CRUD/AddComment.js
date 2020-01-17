import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { Row, Form, Button, Card, Badge } from "react-bootstrap";
import $ from "jquery";

class AddComment extends Component {
  state = {
    comments: [],
    comment: "",
    author: ""
  };

  // Function is used to sort the comments by date posted. Newest -> oldest
  sortBy = (function() {
    var toString = Object.prototype.toString,
      // default parser function
      parse = function(x) {
        return x;
      },
      // gets the item to be sorted
      getItem = function(x) {
        var isObject = x != null && typeof x === "object";
        var isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
      };

    return function sortby(array, cfg) {
      if (!(array instanceof Array && array.length)) return [];
      if (toString.call(cfg) !== "[object Object]") cfg = {};
      if (typeof cfg.parser !== "function") cfg.parser = parse;
      cfg.desc = !!cfg.desc ? -1 : 1;
      return array.sort(function(a, b) {
        a = getItem.call(cfg, a);
        b = getItem.call(cfg, b);
        return cfg.desc * (a > b ? -1 : +(a > b));
      });
    };
  })();

  async componentWillReceiveProps() {
    let data = await Auth.currentSession();
    var token = await data.getIdToken();
    let comments = await API.graphql(
      graphqlOperation(queries.listComments, {
        filter: {
          setID: {
            eq: this.props.id
          }
        },
        limit: 30
      })
    );
    let sortedComments = comments.data.listComments.items;
    this.sortBy(sortedComments, { prop: "createdAt" });
    this.setState({
      comments: sortedComments,
      author: token.payload["cognito:username"]
    });
    console.log(sortedComments);
  }
  render() {
    let addPost = e => {
      e.preventDefault();
      let comment = $("#comment-input").serializeArray()[0].value;
      var d = new Date();
      var date = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
      let data = {
        date: date,
        setID: this.props.id,
        author: this.state.author,
        content: comment
      };
      API.graphql(
        graphqlOperation(mutations.createComment, { input: data })
      ).then(() => {
        window.location.reload();
      });
    };
    let comments;
    if (this.state.comments) {
      comments = this.state.comments.map(post => {
        return (
          <Card body key={post.id} className="set-comment">
            <Row className="card-row pull-left">
              <Badge variant="dark"> {post.author}</Badge>
              <small className="comment-date">{post.date}</small>
            </Row>
            <br></br>
            <Row className="card-row pull-left">{post.content}</Row>
          </Card>
        );
      });
    }
    return (
      <div className="AddComment">
        <Row className="card-row">
          <h2>Comments</h2>
        </Row>
        <Row id="add-comment-row" className="card-row">
          <Form onSubmit={addPost}>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="2"
                width="50"
                id="comment-input"
                name="comment"
                placeholder="Join the discussion..."
              />
            </Form.Group>
            <Button
              type="submit"
              variant="dark"
              size="sm"
              className="pull-right"
            >
              Post
            </Button>
          </Form>
        </Row>
        <div className="set-comment-row card-row">
          {this.state.comments.length ? comments : "Empty..."}
        </div>
      </div>
    );
  }
}
export default AddComment;
