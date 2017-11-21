import React, {Component} from 'react';
import {connect} from 'react-redux';
import PostForm from '../components/PostForm';
import Header from '../components/Header';
import {fetchCategories, fetchComment, editComment} from '../actions';

class EditComment extends Component {
  state = {
    commentAuthor: '',
    commentBody: ''
  };
  componentDidMount() {
    const {commentid} = this.props.match.params;
    this.props.fetchCategories();
    this.props.fetchComment(commentid, payload => {
      this.setState({
        commentAuthor: payload.data.author,
        commentBody: payload.data.body
      });
    });
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitComment = event => {
    event.preventDefault();
    const {id} = this.props.match.params;
    const {commentid} = this.props.match.params;
    const data = {
      author: this.state.commentAuthor,
      body: this.state.commentBody
    };
    this.props.editComment(commentid, data, () => {
      this.props.history.push(`/post/${id}`);
    });
  };
  render() {
    return (
      <div>
        {Object.keys(this.props.categories).length !== 0 && (
          <Header {...this.props} />
        )}
        <div className="container">
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchComment: (data, callback) => dispatch(fetchComment(data, callback)),
  editComment: (data, values, callback) =>
    dispatch(editComment(data, values, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
