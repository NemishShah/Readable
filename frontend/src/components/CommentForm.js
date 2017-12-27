import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { newComment, editComment, getComment } from '../actions/comments';
import { FormGroup, FormControl, ControlLabel, Button, Grid, Row, Col } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';

class CommentForm extends Component {
  state = {
    id: '',
    timestamp: '',
    parentId: '',
    body: '',
    author: '',
    voteScore: 1
  }

  componentDidMount() {
    this.handleAddOrEdit();
  }

  handleAddOrEdit() {
    var commentId = this.props.match.params.commentId;
    if (commentId) {
      this.props.getComment(commentId).then(comment => this.updateStateWithDataFromAPI(comment));
    } else {
      var postId = this.props.match.params.postId;
      if (postId) {
        //This is a new comment for the post
        this.setState({ id: uuidv4(), timestamp: Date.now(), parentId: postId });
      }
    }
  }

  updateStateWithDataFromAPI = (comment) => {
    this.setState({
      id: comment.id,
      timestamp: comment.timestamp,
      parentId: comment.parentId,
      body: comment.body,
      author: comment.author,
      voteScore: comment.voteScore
    })
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  saveComment = () => {
    var commentId = this.props.match.params.commentId;
    if (commentId) {
      this.props.editComment(this.state);
    } else {
      this.props.newComment(this.state);
    }
    this.redirectToPostDetail();
  }

  redirectToPostDetail = () => {
    var category = this.props.match.params.category;
    var postId = this.props.match.params.postId;
    this.props.history.push(`/${category}/${postId}`);
  }

  render() {
    return (
      <div>
        {this.state.id === undefined ? (
          <h1>404 - Data not found</h1>
        ) : (
            <form>
              <Grid>
                <Row className='show-grid'>
                  <Col lg={1}>
                    <Button
                      bsStyle='success'
                      block
                      onClick={() => this.saveComment()}>Save</Button>
                  </Col>
                  <Col lg={10} >
                    <h2 style={{ textAlign: "center" }}>Comment</h2>
                  </Col>
                  <Col lg={1}>
                    <Button
                      bsStyle='danger'
                      block
                      onClick={() => this.redirectToPostDetail()}>Cancel</Button>
                  </Col>
                </Row>
                <Row >

                  <FormGroup controlId="body">
                    <ControlLabel>Details</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      placeholder="Enter details"
                      value={this.state.body}
                      onChange={this.handleInputChange} />
                  </FormGroup>

                  <FormGroup controlId='author'>
                    <ControlLabel>Author</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.author}
                      placeholder="Your name"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                </Row>
              </Grid>
            </form>
          )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  newComment: (comment) => dispatch(newComment(comment)),
  editComment: (comment) => dispatch(editComment(comment)),
  getComment: (id) => dispatch(getComment(id))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(CommentForm)
);