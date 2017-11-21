import React, {Component} from 'react';
import {addPost} from '../actions';
import {connect} from 'react-redux';
import {fetchPost, editPost} from '../actions';
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: '',
      postAuthor: '',
      postCategory: 'react',
      postBody: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    const {id} = this.props.match.params;
    console.log();
    if (typeof id !== 'undefined') {
      this.props.fetchPost(id).then(({payload}) => {
        this.setState({
          postCategory: payload.data.category,
          postTitle: payload.data.title,
          postAuthor: payload.data.author,
          postBody: payload.data.body
        });
      });
    }
  }
  submitPost = event => {
    event.preventDefault();
    const {id} = this.props.match.params;
    if (id) {
      this.props
        .editPost(id, {
          title: this.state.postTitle,
          body: this.state.postBody
        })
        .then(() => {
          this.props.history.push(`/post/${id}`);
        });
    } else {
      const data = {
        id: Math.random()
          .toString(36)
          .substr(-8),
        timestamp: Date.now(),
        title: this.state.postTitle,
        author: this.state.postAuthor,
        category: this.state.postCategory,
        body: this.state.postBody,
        voteScore: 0,
        deleted: false
      };
      this.props.addPost(data).then(() => {
        this.props.history.push('/');
      });
    }
  };
  render() {
    return (
      <form onSubmit={this.submitPost}>
        <div className="form-group">
          <label htmlFor="post-title"> Title </label>
          <input
            type="text"
            className="form-control"
            name="postTitle"
            id="post-title"
            value={this.state.postTitle}
            onChange={this.handleChange}
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="post-author"> Author </label>
          <input
            type="text"
            className="form-control"
            id="post-author"
            value={this.state.postAuthor}
            name="postAuthor"
            onChange={this.handleChange}
            placeholder="author"
          />
        </div>
        <div className="form-group">
          <label htmlFor="post-category"> Category </label>
          <select
            name="postCategory"
            className="form-control"
            value={this.state.postCategory}
            onChange={this.handleChange}
          >
            {this.props.categories &&
              this.props.categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="post-body"> Body </label>
          <textarea
            className="form-control"
            id="post-body"
            rows="3"
            name="postBody"
            value={this.state.postBody}
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
const mapStateToProps = (state, ownProps) => ({
  categories: state.categories,
  posts: state.postData
});

const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(addPost(data)),
  fetchPost: data => dispatch(fetchPost(data)),
  editPost: (data, value) => dispatch(editPost(data, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
