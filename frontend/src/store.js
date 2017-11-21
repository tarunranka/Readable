import {createStore, compose, applyMiddleware} from 'redux'; // add applyMiddleware
import thunk from 'redux-thunk'; // import
import rootReducer from './reducers';
//import logger from 'redux-logger';
import promise from 'redux-promise';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, promise))
);

export default store;
