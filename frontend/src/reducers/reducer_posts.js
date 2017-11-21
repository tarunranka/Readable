import {
  FETCH_POSTS,
  FETCH_POST,
  FETCH_POSTS_BY_CATEGORY,
  ADD_POST,
  DELETE_POST,
  FETCH_POST_COMMENTS,
  FETCH_POST_BY_TIMESTAMP,
  FETCH_POST_BY_VOTE
} from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      const postdata = action.payload.data
        .filter(post => !post.deleted)
        .sort((a, b) => b.voteScore - a.voteScore);
      return {...state, posts: postdata};
    case FETCH_POST_BY_TIMESTAMP:
      const postTdata = action.payload.data
        .filter(post => !post.deleted)
        .sort((a, b) => b.timestamp - a.timestamp);
      return {...state, posts: postTdata};
    case FETCH_POST_BY_VOTE:
      const postVdata = action.payload.data
        .filter(post => !post.deleted)
        .sort((a, b) => b.voteScore - a.voteScore);
      return {...state, posts: postVdata};
    case FETCH_POSTS_BY_CATEGORY:
      const categorydata = action.payload.data
        .filter(post => !post.deleted)
        .sort((a, b) => b.voteScore - a.voteScore);
      return {...state, posts: categorydata};
    case ADD_POST:
      return state;
    case DELETE_POST:
      return state;
    case FETCH_POST:
      return {...state, current: action.payload.data};
    case FETCH_POST_COMMENTS:
      const commentData = action.payload.data
        .filter(comment => !comment.deleted)
        .sort((a, b) => b.voteScore - a.voteScore);
      return {...state, comments: commentData};
    default:
      return state;
  }
}
