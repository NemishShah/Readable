import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from "../actions/posts";
import DataTables from 'material-ui-datatables';

const TABLE_COLUMNS = [
//   {
//     key: 'id',
//     label: 'Id',
//     alignRight: true,
//     style: {
//       width: 10,
//     }
//   }, 
  {
    key: 'timestamp',
    label: 'Timestamp',
    sortable: true,
    render: (foo, all) =><i>{Date.now()}</i>,
    style: {
      width: 50,
    }
  }, 
  {
    key: 'title',
    label: 'Title',
    sortable: true,
    style: {
      overflow: 'hidden',
      width: 100,
    }
  }, 
  {
    key: 'body',
    label: 'Body',
    style: {
      width: 500,
    }
  }, 
  {
    key: 'author',
    label: 'Author',
    sortable: true,
    style: {
      width: 50,
    }
  }, 
  {
    key: 'category',
    label: 'Category',
    sortable: true,
    style: {
      width: 10,
    }
  }, 
  {
    key: 'voteScore',
    label: 'VoteScore',
    alignRight: true,
    sortable: true,
    style: {
      width: 30,
      margin: 10,
    }
  }
];
 
class Posts extends Component {
 

  componentDidMount() {
    this.props.getAllPosts();
  };

  handleSortOrderChange = (key, order) => {
    // your sort logic
  }
 
  render() {
    console.log(this.props.posts);
    return (
      <DataTables
        height={'auto'}
        selectable={false}
        showRowHover={true}
        columns={TABLE_COLUMNS}
        data={this.props.posts}
        showCheckboxes={false}
        onCellClick={this.handleCellClick}
        onCellDoubleClick={this.handleCellDoubleClick}
        onSortOrderChange={this.handleSortOrderChange}
        page={1}
        rowSize={1000}
        count={1000}
        showFooterToolbar={false}
        tableRowColumnStyle={{overflowWrap: "break-word"}}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts : state.posts
});

const mapDispatchToProps = dispatch => ({
  getAllPosts : () => dispatch(getAllPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)