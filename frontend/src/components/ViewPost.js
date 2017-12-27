import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Panel, Grid, Row, Col, Well, Label } from 'react-bootstrap';
import { formatTimestamp } from '../utils/formatTimestamp';
import { deletePostById, votePostById } from '../actions/posts';
import { withRouter } from 'react-router-dom';

class ViewPost extends Component {

  navigateToDetails = (post) => {
    this.props.history.push(`/${post.category}/${post.id}`);
  }

  navigateToEdit = (post) => {
    this.props.history.push(`/post/${post.id}`);
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        <Panel header={post.title}>
          <Grid>
            <Col lg={1}>
              <Button
                bsStyle='success'
                bsSize='small'
                onClick={() => this.props.votePostById(post.id, 'upVote')}>Vote Up</Button>
              <h4><Label >  {post.voteScore}  </Label></h4>
              <Button
                bsStyle='danger'
                bsSize='small'
                onClick={() => this.props.votePostById(post.id, 'downVote')}>Vote Down</Button>
            </Col>
            <Col lg={11}>
              <Row className='show-grid'>
                <Col lg={11}> <Well>{post.body}</Well></Col>
              </Row>
              <Row className='show-grid'>
                <Col lg={2}>By: {post.author}</Col>
                <Col lg={4}>Last updated: {formatTimestamp(post.timestamp)}</Col>
                <Col lg={3}>Category: {post.category}</Col>
                <Col lg={2}>Comments # <Label >{post.commentCount}</Label ></Col>
              </Row>
              <Row className='show-grid'>
                <Col lg={2}>
                  <Button
                    bsStyle='success'
                    block
                    onClick={() => this.navigateToEdit(post)}>Edit</Button>
                </Col>
                <Col lg={2} />
                <Col lg={2}>
                {this.props.showDetailsButton ? (
                  <Button
                    bsStyle='primary'
                    block
                    onClick={() => this.navigateToDetails(post)}>Details</Button>
                  ) : ''}
                </Col>
                <Col lg={2} />
                <Col lg={2}>
                  <Button
                    bsStyle='danger'
                    block
                    onClick={() => this.props.deletePostById(post.id)}>Delete</Button>
                </Col>
              </Row>
            </Col>
          </Grid>
        </Panel>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deletePostById: (id) => dispatch(deletePostById(id)),
  votePostById: (id, option) => dispatch(votePostById(id, option))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ViewPost)
);
