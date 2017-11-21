import axios from 'axios';

export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const ADD_POST = 'add_post';
export const DELETE_POST = 'delete_post';
export const EDIT_POST = 'edit_post';
export const FETCH_POSTS_BY_CATEGORY = 'fetch_posts_by_category';
export const FETCH_POST_COMMENTS = 'fetch_post_comments';
export const CREATE_COMMENT = 'create_comment';
export const DELETE_COMMENT = 'delete_comment';
export const EDIT_COMMENT = 'edit_comment';
export const FETCH_COMMENT = 'fetch_comment';
export const POST_VOTE = 'post_vote';
export const FETCH_POST_BY_TIMESTAMP = 'fetch_post_by_timestamp';
export const FETCH_POST_BY_VOTE = 'fetch_post_by_vote';

const ROOT_URL = 'http://localhost:3001';

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token
};

// Fetch all the Categories
export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`, {
    headers
  });
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function fetchPostsByCategory(category) {
  const request = axios.get(`${ROOT_URL}/${category}/posts`, {
    headers
  });
  return {
    type: FETCH_POSTS_BY_CATEGORY,
    payload: request
  };
}

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`, {
    headers
  });
  return {
    type: FETCH_POST_BY_TIMESTAMP,
    payload: request
  };
}

export function fetchPostsByTimestamp() {
  const request = axios.get(`${ROOT_URL}/posts`, {
    headers
  });
  return {
    type: FETCH_POST_BY_TIMESTAMP,
    payload: request
  };
}

export function fetchPostsByVote() {
  const request = axios.get(`${ROOT_URL}/posts`, {
    headers
  });
  return {
    type: FETCH_POST_BY_VOTE,
    payload: request
  };
}

export function fetchPost(id, callback) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`, {
    headers
  });
  return {
    type: FETCH_POST,
    payload: request
  };
}

export function addPost(value) {
  const request = axios.post(`${ROOT_URL}/posts`, value, {
    headers
  });
  return {
    type: ADD_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}`, {
    headers
  });
  return {
    type: DELETE_POST,
    payload: id
  };
}

export function editPost(id, values) {
  console.log(id, values);
  const request = axios.put(`${ROOT_URL}/posts/${id}`, values, {
    headers
  });

  return {
    type: EDIT_POST,
    payload: request
  };
}

export function fetchPostComments(postId) {
  const request = axios.get(`${ROOT_URL}/posts/${postId}/comments`, {
    headers
  });
  return {
    type: FETCH_POST_COMMENTS,
    payload: request
  };
}
export function fetchComment(id, callback) {
  const request = axios
    .get(`${ROOT_URL}/comments/${id}`, {
      headers
    })
    .then(data => callback(data));
  return {
    type: FETCH_COMMENT,
    payload: id
  };
}
export function createComment(id, values) {
  const request = axios.post(`${ROOT_URL}/comments`, values, {
    headers
  });
  return {
    type: CREATE_COMMENT,
    payload: request
  };
}

export function deleteComment(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/comments/${id}`, {
      headers
    })
    .then(() => callback());
  return {
    type: DELETE_COMMENT,
    payload: id
  };
}

export function editComment(id, values, callback) {
  const request = axios
    .put(`${ROOT_URL}/comments/${id}`, values, {
      headers
    })
    .then(() => callback());
  return {
    type: EDIT_COMMENT,
    payload: id
  };
}

export function postVote(id, values, callback) {
  console.log(values);
  const request = axios
    .put(`${ROOT_URL}/comments/${id}`, values, {
      headers
    })
    .then(data => callback(data));
  return {
    type: POST_VOTE,
    payload: id
  };
}
