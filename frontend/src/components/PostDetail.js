import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostsForCategory } from "../actions/posts";
import { getCommentsByPostId } from '../actions/comments';
import ViewPost from './ViewPost';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import Comments from './Comments';

class PostDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
  };

  componentDidMount() {
    
    var postId = this.props.match.params.postId;
    if (this.props.posts && this.props.posts.length !== 0) {

      var post = this.props.posts.filter((p) => p.id === postId);
      if (post && post.length === 1) {
        this.setState({ post: post[0] });
      }
    } else {
      var category = this.props.match.params.category;
      this.props.getPostsForCategory(category);
    }
    this.props.getCommentsByPostId(postId);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.posts) !== JSON.stringify(this.props.posts)) {

      var postId = this.props.match.params.postId;
      if (nextProps.posts && nextProps.posts.length !== 0) {

        var post = nextProps.posts.filter((p) => p.id === postId);
        if (post && post.length === 1) {
          this.setState({ post: post[0] });
        } else {
          this.props.history.push('/' + this.props.match.params.category);
        }
      }else {
        this.props.history.push('/' + this.props.match.params.category);
      }
    }
  }

  navigateToAddComment = () => {
    var category = this.state.post.category;
    var postId = this.state.post.id;
    this.props.history.push(`/${category}/${postId}/comment`);
  }

  render() {
    return (
      <div>
        {this.state.post === null ? (
          <h1>404 - Data not found</h1>
        ) : (
            <div>
              <Grid>
                <Row className='show-grid'>
                  <Col lg={1}>
                    <Button
                      bsStyle='success'
                      bsSize='large'
                      onClick={() => this.navigateToAddComment()}>Add comment</Button>
                  </Col>
                  <Col lg={10} >
                    <h2 style={{ textAlign: "center" }}>Post detail</h2>
                  </Col>
                  <Col lg={1}>
                    <Button
                      bsStyle='danger'
                      bsSize='large'
                      onClick={() => this.props.history.push('/' + this.state.post.category)}>Cancel</Button>
                  </Col>
                </Row>
              </Grid>
              <ViewPost post={this.state.post} showDetailsButton={false}/>
              <Comments />
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  comments: state.comments
});


const mapDispatchToProps ={
  getPostsForCategory,
  getCommentsByPostId
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetails)
)