import React, {Component} from 'react';
import {formatTimestamp} from '../utils/helper';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteComment, fetchPostComments, postVote} from '../actions';

class Comment extends Component {
  handleDeleteComment(id) {
    this.props.deleteComment(id, () => {
      this.props.fetchPostComments(id);
    });
  }
  handleVote(count, id, postId) {
    let countValue;

    if (count == '1') {
      countValue = this.props.voteScore + 1;
    } else if (count == '-1') {
      countValue = this.props.voteScore - 1;
    }
    this.props.postVote(id, {voteScore: countValue}, () => {
      console.log(postId);
      this.props.fetchPostComments(postId);
    });
  }
  render() {
    const {posts} = this.props;
    console.log(121212);
    console.log(this.props);
    return (
      <div className="comments">
        <div className="comment-wrap">
          <div className="comment-block">
            <p className="comment-text"> {this.props.body} </p>
            <div className="bottom-comment">
              <div className="comment-author"> {this.props.author} </div>
              <div className="comment-date">
                {formatTimestamp(this.props.time)}
              </div>
              <div>
                <i
                  className="thumb thumb-up"
                  aria-hidden="true"
                  onClick={() =>
                    this.handleVote(1, this.props.id, this.props.postId)}
                />
                <span className="vote">{this.props.voteScore}</span>
                <i
                  className="thumb thumb-down"
                  aria-hidden="true"
                  onClick={() =>
                    this.handleVote(-1, this.props.id, this.props.postId)}
                />
              </div>
              <ul className="comment-actions">
                <li className="edit">
                  <Link
                    to={`/comment/${this.props.postId}/edit/${this.props.id}`}
                  >
                    Edit
                  </Link>
                </li>
                <li
                  className="delete"
                  onClick={() => this.handleDeleteComment(this.props.id)}
                >
                  Delete
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  deleteComment: (data, callback) => dispatch(deleteComment(data, callback)),
  fetchPostComments: data => dispatch(fetchPostComments(data)),
  postVote: (data, value, callback) => dispatch(postVote(data, value, callback))
});

export default connect(null, mapDispatchToProps)(Comment);
