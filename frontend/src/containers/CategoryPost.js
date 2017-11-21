import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCategories, fetchPostsByCategory} from '../actions';
import Header from '../components/Header';
import Post from '../components/Post';

class CategoryPost extends Component {
  componentDidMount() {
    const {match} = this.props;
    const Routecategory =
      match && match.params && match.params.category
        ? match.params.category
        : null;
    if (Routecategory != null) {
      this.props.fetchPostsByCategory(this.props.match.params.category);
    }
    this.props.fetchCategories();
  }
  componentWillReceiveProps(nextProps) {
    const {location, match: {params}} = nextProps;

    if (location !== this.props.location) {
      this.props.fetchPostsByCategory(params.category);
    }
  }

  render() {
    const {posts} = this.props.posts;
    return (
      <div>
        {Object.keys(this.props.categories).length !== 0 && (
          <Header {...this.props} />
        )}
        {posts && <Post posts={posts} />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories,
  posts: state.postData
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPostsByCategory: data => dispatch(fetchPostsByCategory(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPost);
