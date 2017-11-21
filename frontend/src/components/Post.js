import React, {Component} from 'react';
import {formatTimestamp} from '../utils/helper';
import {Link} from 'react-router-dom';
class Post extends Component {
  render() {
    const {posts} = this.props;
    return (
      <main role="main" className="container">
        <div className="row">
          <div className="col-md-12">
            {this.props.posts &&
              this.props.posts.map(post => (
                <div className="blog-post" key={post.id}>
                  <h2 className="blog-post-title">{post.title}</h2>
                  <div className="blog-post-meta">
                    {formatTimestamp(post.timestamp)} by {post.author}
                  </div>
                  <Link to={`/post/${post.id}`}>Read more</Link>
                </div>
              ))}
          </div>
        </div>
      </main>
    );
  }
}

export default Post;
