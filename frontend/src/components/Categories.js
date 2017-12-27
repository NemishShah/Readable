import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCategories } from "../actions/categories";
import { getAllPosts, getPostsForCategory } from "../actions/posts";
import Posts from './Posts';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router-dom';

// Learning: https://reacttraining.com/react-router/web/api/withRouter

class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'all',
    };
  };

  handleCategoryChange = (value) => {
    if (value === 'all') {
      this.props.history.push('/')
    } else {
      this.props.history.push('/' + value);
    }
    this.setState({
      selectedCategory: value,
    });
  };

  componentDidMount() {
    this.props.getAllCategories();
    this.setActiveCategoryAndPosts();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.setActiveCategoryAndPosts();
    }
  };

  setActiveCategoryAndPosts = () => {
    var category = this.props.match.params.category;
    if (! category) {
      this.props.getAllPosts();
      this.setState({
        selectedCategory: 'all',
      });
    } else {
      this.props.getPostsForCategory(category);
      this.setState({
        selectedCategory: category,
      });
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Tabs
            value={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          >
            {this.props.categories.map((category) => (
              <Tab
                key={category.path}
                value={category.path}
                label={category.name}
              >
                <Posts />
              </Tab>
            ))}
          </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  getAllCategories: () => dispatch(getAllCategories()),
  getAllPosts: () => dispatch(getAllPosts()),
  getPostsForCategory: (category) => dispatch(getPostsForCategory(category))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Categories)
)