import * as api from "../utils/api";
import {
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  UPDATE_POST,
  DELETE_POST,
  VOTE_POST,
  SORT_POSTS
} from "./types";

export const getAllPosts = () => dispatch => (
  api
    .getAllPosts()
    .then(posts => dispatch(getPosts(posts)))
);

export const getPostsForCategory = (category) => dispatch => (
  api
    .getPostsByCategory(category)
    .then(posts => dispatch(getPostsByCategory(posts)))
);

export const getPostById = (id) => dispatch => (
  api
    .getPostById(id)
);

export const newPost = (post) => dispatch => (
  api.createPost(post)
);

export const editPost = (post) => dispatch => (
  api
    .updatePost(post.id, post)
    .then(post => dispatch(updatePost(post)))
);

export const deletePostById = (id) => dispatch => (
  api
    .deletePost(id)
    .then(post => dispatch(deletePost(post)))
);

export const votePostById = (id, option) => dispatch => (
  api
    .votePost(id, option)
    .then(post => dispatch(votePost(post)))
);

export const getPosts = posts => ({
  type: GET_POSTS,
  posts: posts.filter(post => post.deleted !== true)
});

export const getPostsByCategory = posts => ({
  type: GET_POSTS_BY_CATEGORY,
  posts: posts.filter(post => post.deleted !== true)
});

export const updatePost = post => ({
  type: UPDATE_POST,
  post: post
});

export const deletePost = post => ({
  type: DELETE_POST,
  post: post
});

export const votePost = post => ({
  type: VOTE_POST,
  post: post
});


export const sortPosts = (sortBy, sortOrder) => ({
  type: SORT_POSTS,
  sortBy,
  sortOrder
});