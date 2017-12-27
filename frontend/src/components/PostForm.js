import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllCategories } from "../actions/categories";
import { newPost, editPost, getPostById } from '../actions/posts';
import { FormGroup, FormControl, ControlLabel, Button, Grid, Row, Col } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';
import { If, Then, Else } from 'react-if';

class PostForm extends Component {
  state = {
    id: '',
    timestamp: '',
    title: '',
    body: '',
    author: '',
    category: 'react',
    voteScore: 1
  }

  componentDidMount() {
    this.props.getAllCategories();
    this.handleAddOrEdit();
  }

  handleAddOrEdit() {
    var postId = this.props.match.params.postId;
    if (postId) {
      this.props.getPostById(postId).then(post => this.updateStateWithDataFromAPI(post));
    } else {
      this.setState({ id: uuidv4(), timestamp: Date.now() });
    }
  }

  updateStateWithDataFromAPI = (post) => {
    this.setState({
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: post.voteScore
    })
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  savePost = () => {
    var postId = this.props.match.params.postId;
    if (postId) {
      this.props.editPost(this.state);
    }
    else {
      this.props.newPost(this.state);
    }
    this.props.history.push('/' + this.state.category);
  }

  render() {

    const optionList = this.props.categories
      .filter((category) => category.name !== 'all')
      .map((category) => (<option key={category.name} value={category.name}>{category.name}</option>));

    return (
      <div>
        <If condition={this.state.id === undefined}>
          <Then><h1>404 - Data not found</h1></Then>
          <Else>
            <form>
              <Grid>
                <Row className='show-grid'>
                  <Col lg={1}>
                    <Button
                      bsStyle='success'
                      block
                      onClick={() => this.savePost()}>Save</Button>
                  </Col>
                  <Col lg={10} >
                    <h2 style={{ textAlign: "center" }}>Post</h2>
                  </Col>
                  <Col lg={1}>
                    <Button
                      bsStyle='danger'
                      block
                      onClick={() => this.props.history.push('/' + this.state.category)}>Cancel</Button>
                  </Col>
                </Row>
                <Row >

                  <FormGroup controlId='title'>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.title}
                      placeholder="Enter title"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup controlId="body">
                    <ControlLabel>Details</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      placeholder="Enter details"
                      value={this.state.body}
                      onChange={this.handleInputChange} />
                  </FormGroup>

                  <FormGroup controlId="category">
                    <ControlLabel>Category</ControlLabel>
                    <FormControl
                      componentClass="select"
                      value={this.state.category}
                      onChange={this.handleInputChange} >
                      {optionList}
                    </FormControl>
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
          </Else>
        </If>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories
});

const mapDispatchToProps = {
  getAllCategories,
  newPost,
  editPost,
  getPostById
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostForm)
);