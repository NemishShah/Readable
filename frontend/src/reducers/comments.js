import {
  GET_COMMENTS,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from "../actions/types";
import initialStates from './initialStates';

export default function comments(state = initialStates.comments, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.comments;
    case VOTE_COMMENT:
    case UPDATE_COMMENT:
      return state.map(comment => comment.id === action.comment.id ? action.comment : comment);
    case DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.comment.id);
    default:
      return state;
  }
}