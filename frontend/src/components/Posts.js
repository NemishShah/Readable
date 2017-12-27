import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Row, Col, Label, SplitButton, MenuItem } from 'react-bootstrap';
import ViewPost from './ViewPost';
import { sortPosts } from '../actions/posts';

class Posts extends Component {

  navigateToCreate = () => {
    this.props.history.push(`/post`);
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col lg={4}>
              <SplitButton
                title='Sort by:'
                id='SortOptions'
                bsSize='large'>
                <MenuItem onSelect={() => this.props.sortPosts('timestamp', 'desc')}>Date (desc)</MenuItem>
                <MenuItem onSelect={() => this.props.sortPosts('timestamp', 'asc')}>Date (asc)</MenuItem>
                <MenuItem divider />
                <MenuItem onSelect={() => this.props.sortPosts('voteScore', 'desc')}>Score (desc)</MenuItem>
                <MenuItem onSelect={() => this.props.sortPosts('voteScore', 'asc')}>Score (asc)</MenuItem>
              </SplitButton>
            </Col>
            <Col lg={7}>
              <h3>Posts # <Label >{this.props.posts.length} </Label ></h3>
            </Col>
            <Col lg={1}>
              <Button
                bsStyle='success'
                bsSize='large'
                onClick={() => this.navigateToCreate()}>Add post</Button>
            </Col>
          </Row>
        </Grid>
        <div>
          {this.props.posts.map(post => (
            <div key={post.id} >
              <ViewPost post={post} showDetailsButton={true}/>
            </div>
          )
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts
});

const mapDispatchToProps = {
  sortPosts
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Posts)
);
