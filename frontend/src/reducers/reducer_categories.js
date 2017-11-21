import {FETCH_CATEGORIES} from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload.data.categories;
    default:
      return state;
  }
}
