import React, {Component} from 'react';
import {formatTimestamp} from '../utils/helper';
import {Link} from 'react-router-dom';
import {
  fetchPostVote,
  fetchPostsByCategory,
  fetchPosts,
  deletePost
} from '../actions';
import {connect} from 'react-redux';

class Post extends Component {
  handleVote(count, id, score, cat) {
    let countValue;
    if (count == '1') {
      countValue = score + 1;
    } else if (count == '-1') {
      countValue = score - 1;
    }
    this.props.fetchPostVote(id, {voteScore: countValue}, () => {
      if (this.props.iscategory) {
        this.props.fetchPostsByCategory(cat);
      } else {
        this.props.fetchPosts();
      }
    });
  }
  handleDeletePost(postId, cat) {
    this.props.deletePost(postId);
    if (this.props.iscategory) {
      this.props.fetchPostsByCategory(cat);
    } else {
      this.props.fetchPosts();
    }
  }
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
                  <p>{post.category}</p>
                  <div className="blog-post-meta">
                    {formatTimestamp(post.timestamp)} by {post.author}
                  </div>
                  <p>Comment:{post.commentCount}</p>
                  <div>
                    <i
                      className="thumb thumb-up"
                      aria-hidden="true"
                      onClick={() =>
                        this.handleVote(
                          1,
                          post.id,
                          post.voteScore,
                          post.category
                        )}
                    />
                    <span className="vote">{post.voteScore}</span>
                    <i
                      className="thumb thumb-down"
                      aria-hidden="true"
                      onClick={() =>
                        this.handleVote(
                          -1,
                          post.id,
                          post.voteScore,
                          post.category
                        )}
                    />
                  </div>
                  <div className="clearfix">
                    <div className="float-left">
                      <Link to={`/posts/edit/${post.id}`}> Edit </Link>
                    </div>
                    <div className="float-right">
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          this.handleDeletePost(post.id, post.category)}
                      >
                        Delete
                      </button>
                    </div>
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

const mapDispatchToProps = dispatch => ({
  fetchPostVote: (data, value, callback) =>
    dispatch(fetchPostVote(data, value, callback)),
  fetchPosts: () => dispatch(fetchPosts()),
  deletePost: data => dispatch(deletePost(data)),
  fetchPostsByCategory: data => dispatch(fetchPostsByCategory(data))
});

export default connect(null, mapDispatchToProps)(Post);
