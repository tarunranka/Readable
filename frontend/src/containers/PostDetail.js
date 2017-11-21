import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  fetchCategories,
  fetchPost,
  deletePost,
  fetchPostComments
} from '../actions';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
import {formatTimestamp} from '../utils/helper';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';

class PostDetail extends Component {
  componentDidMount() {
    const {match} = this.props;
    const postId =
      match && match.params && match.params.id ? match.params.id : null;
    if (postId != null) {
      this.props.fetchPost(postId);
      this.props.fetchPostComments(postId);
    }
    this.props.fetchCategories();
  }
  componentWillReceiveProps(nextProps) {
    const {location, match: {params}} = nextProps;

    if (location !== this.props.location) {
      this.props.fetchPost(params.id);
    }
  }
  handleDeletePost = event => {
    const {match} = this.props;
    const postId =
      match && match.params && match.params.id ? match.params.id : null;
    this.props.deletePost(postId);
    this.props.history.push('/');
  };

  renderComments() {
    const {id} = this.props.match.params;
    const {comments} = this.props.posts;
    console.log('comments');
    console.log(comments);
    if (comments) {
      console.log('comments inside');
      return comments.map(comment => {
        return (
          <Comment
            key={comment.id}
            id={comment.id}
            postId={id}
            author={comment.author}
            body={comment.body}
            time={comment.timestamp}
            voteScore={comment.voteScore}
          />
        );
      });
    }
  }
  render() {
    const {match} = this.props;
    const {current} = this.props.posts;

    const postId =
      match && match.params && match.params.id ? match.params.id : null;

    return (
      <div>
        {Object.keys(this.props.categories).length !== 0 && (
          <Header {...this.props} />
        )}
        <div className="container">
          <div className="clearfix">
            <div className="float-left">
              <Link to={`/posts/edit/${postId}`}> Edit </Link>
            </div>
            <div className="float-right">
              <button
                className="btn btn-danger"
                onClick={this.handleDeletePost}
              >
                Delete
              </button>
            </div>
          </div>
          {current && (
            <div className="blog-post" key={current.id}>
              <h2 className="blog-post-title">{current.title}</h2>
              <div className="blog-post-meta">
                {formatTimestamp(current.timestamp)} by {current.author}
              </div>
              <p>{current.body}</p>
            </div>
          )}

          <div>
            <h4 className="title is-4">Comments</h4>
            <CommentForm {...this.props} />
            {this.renderComments()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories,
  posts: state.postData
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPost: data => dispatch(fetchPost(data)),
  deletePost: data => dispatch(deletePost(data)),
  fetchPostComments: data => dispatch(fetchPostComments(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
