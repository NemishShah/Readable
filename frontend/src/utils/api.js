const api = "http://localhost:3001"
const headers = {
  'Authorization': 'Nemish-Shah',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

// Category
export const getAllCategories = () => {
  return fetch(`${api}/categories`, { headers })
    .then(response => response.json())
    .then(data => data.categories)
}

// Posts
export const getAllPosts = () => {
  return fetch(`${api}/posts`, { headers })
    .then(response => response.json())
}

export const getPostsByCategory = (category) => {
  return fetch(`${api}/${category}/posts`, { headers })
    .then(response => response.json())
}

export const getPostById = (id) => {
  return fetch(`${api}/posts/${id}`, { headers })
    .then(response => response.json())
}

export const createPost = (post) => {
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(post)
  })
}

export const updatePost = (id, post) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(post)
  })
}

export const votePost = (id, vote) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      option: vote
    })
  })
    .then(response => response.json())
}

export const deletePost = (id) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  })
  .then(response => response.json())
}

// Comments
export const getComments = (postId) => {
  return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(response => response.json())
}

export const getCommentById = (id) => {
  return fetch(`${api}/comments/${id}`, { headers })
    .then(response => response.json())
}

export const createComment = (comment) => {
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(comment)
  })
}

export const updateComment = (id, comment) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(comment)
  })
}

export const voteComment = (id, vote) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      option: vote
    })
  })
  .then(response => response.json())
}

export const deleteComment = (id) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  })
  .then(response => response.json())
}