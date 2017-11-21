import {combineReducers} from 'redux';

import CategoriesReducer from './reducer_categories';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  postData: PostsReducer
});

export default rootReducer;
