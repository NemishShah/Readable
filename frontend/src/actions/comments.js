import * as api from "../utils/api";
import {
  GET_COMMENTS,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from "./types";

export const getCommentsByPostId = (postId) => dispatch => (
  api
    .getComments(postId)
    .then(comments => dispatch(getComments(comments)))
);

export const getComment = (id) => dispatch => (
  api.getCommentById(id)
);

export const newComment = (comment) => dispatch => (
  api.createComment(comment)
);

export const editComment = (comment) => dispatch => (
  api
    .updateComment(comment.id, comment)
    .then(comment => dispatch(updateComment(comment)))
);

export const deleteCommentById = (id) => dispatch => (
  api
    .deleteComment(id)
    .then(comment => dispatch(deleteComment(comment)))
);

export const voteCommentById = (id, option) => dispatch => (
  api
    .voteComment(id, option)
    .then(comment => dispatch(voteComment(comment)))
);

export const getComments = comments => ({
  type: GET_COMMENTS,
  comments: comments
});

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment: comment
});

export const deleteComment = comment => ({
  type: DELETE_COMMENT,
  comment: comment
});

export const voteComment = comment => ({
  type: VOTE_COMMENT,
  comment: comment
});