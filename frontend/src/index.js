import React from 'react';
import ReactDOM from 'react-dom';
import './blog.css';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PostsIndex from './containers/PostsIndex';
import CategoryPost from './containers/CategoryPost';
import NewPost from './containers/NewPost';
import PostDetail from './containers/PostDetail';
import EditComment from './containers/EditComment';
import NotFound from './containers/NotFound';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PostsIndex} />
        <Route path="/c/:category" component={CategoryPost} />
        <Route path="/post/:category/:id" component={PostDetail} />
        <Route exact path="/new-post" component={NewPost} />
        <Route path="/posts/edit/:id" component={NewPost} />
        <Route path="/comment/:id/edit/:commentid" component={EditComment} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
