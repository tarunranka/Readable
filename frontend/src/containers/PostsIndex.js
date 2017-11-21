import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  fetchCategories,
  fetchPosts,
  fetchPostsByTimestamp,
  fetchPostsByVote
} from '../actions';
import Header from '../components/Header';
import Post from '../components/Post';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }
  handleSorting = event => {
    console.log(event.target.value);
    if (event.target.value == 'byvote') {
      this.props.fetchPostsByVote();
    } else if (event.target.value == 'byTime') {
      this.props.fetchPostsByTimestamp();
    } else {
      this.props.fetchPosts();
    }
  };
  render() {
    const {posts} = this.props.posts;
    return (
      <div>
        {Object.keys(this.props.categories).length !== 0 && (
          <Header {...this.props} />
        )}
        <div className="container">
          <div className="form-group mx-sm-3">
            <label htmlFor="Sort">Sort</label>
            <select
              className="form-control"
              id="Sort"
              onChange={this.handleSorting}
            >
              <option>default</option>
              <option value="byvote">VoteScore</option>
              <option value="byTime">Timestamp</option>
            </select>
          </div>
        </div>
        {posts && <Post posts={posts} />}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    categories: state.categories,
    posts: state.postData
  };
}

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
  fetchPostsByTimestamp: () => dispatch(fetchPostsByTimestamp()),
  fetchPostsByVote: () => dispatch(fetchPostsByVote())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
