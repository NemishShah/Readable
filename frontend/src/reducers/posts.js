import {
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  UPDATE_POST,
  DELETE_POST,
  VOTE_POST,
  SORT_POSTS
} from "../actions/types";
import sortOn  from 'sort-on';
import initialStates from './initialStates';

export default function posts(state = initialStates.posts, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_BY_CATEGORY:
      return action.posts;
    case VOTE_POST:
    case UPDATE_POST:
      return state.map(post => post.id === action.post.id ? action.post : post);
    case DELETE_POST:
      return state.filter(post => post.id !== action.post.id);
    case SORT_POSTS:
      var sortProperty = (action.sortOrder === 'desc'? '-': '') + action.sortBy;
      return sortOn(state, sortProperty);
    default:
      return state;
  }
}
