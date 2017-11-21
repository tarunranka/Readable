import React, {Component} from 'react';
import {formatTimestamp} from '../utils/helper';
import {Link} from 'react-router-dom';
import {createComment, fetchPostComments} from '../actions';
import {connect} from 'react-redux';
class CommentForm extends Component {
  state = {
    commentAuthor: '',
    commentBody: ''
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitComment = event => {
    event.preventDefault();
    const {id} = this.props.match.params;
    const data = {
      id: Math.random()
        .toString(36)
        .substr(-8),
      timestamp: Date.now(),
      author: this.state.commentAuthor,
      body: this.state.commentBody,
      parentId: id
    };
    this.props.createComment(id, data).then(() => {
      this.props.fetchPostComments(id);
    });
  };
  render() {
    return (
      <form onSubmit={this.submitComment}>
        <div className="form-group">
          <label htmlFor="comment-author"> Author </label>
          <input
            type="text"
            className="form-control"
            id="comment-author"
            value={this.state.commentAuthor}
            name="commentAuthor"
            onChange={this.handleChange}
            placeholder="author"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment-body"> Body </label>
          <textarea
            className="form-control"
            id="comment-body"
            rows="3"
            name="commentBody"
            value={this.state.commentBody}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createComment: (data, values) => dispatch(createComment(data, values)),
  fetchPostComments: data => dispatch(fetchPostComments(data))
});

export default connect(null, mapDispatchToProps)(CommentForm);
