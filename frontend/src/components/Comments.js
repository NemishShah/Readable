import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Panel, Grid, Row, Col, Label } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import { deleteCommentById, voteCommentById } from '../actions/comments';

class Comments extends Component {

  navigateToEdit = (comment) => {
    var category = this.props.match.params.category;
    var postId = this.props.match.params.postId;    
    this.props.history.push(`/${category}/${postId}/${comment.id}`);
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Comments </h2>
        {this.props.comments.map(comment => (
          <Panel key={comment.id}>
            <Grid>
              <Col lg={1}>
                <Button
                  bsStyle='success'
                  bsSize='small'
                  onClick={() => this.props.voteCommentById(comment.id, 'upVote')}>Vote Up</Button>
                <h4><Label >  {comment.voteScore}  </Label></h4>
                <Button
                  bsStyle='danger'
                  bsSize='small'
                  onClick={() => this.props.voteCommentById(comment.id, 'downVote')}>Vote Down</Button>
              </Col>
              <Col lg={11}>
                <Row className="show-grid">
                  <Col lg={4}> {comment.body}</Col>
                </Row>
                <Row className="show-grid">
                  <Col lg={2}>By: {comment.author}</Col>
                </Row>
                <Row className="show-grid">
                  <Col lg={2}>
                    <Button
                      bsStyle='success'
                      block
                      onClick={() => this.navigateToEdit(comment)}>Edit</Button>
                  </Col>
                  <Col lg={2} />
                  <Col lg={4} />
                  <Col lg={2}>
                    <Button
                      bsStyle='danger'
                      block
                      onClick={() => this.props.deleteCommentById(comment.id)}>Delete</Button>
                  </Col>
                </Row>
              </Col>
            </Grid>
          </Panel>
        )
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments
});

const mapDispatchToProps = {
  deleteCommentById,
  voteCommentById
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Comments)
);
