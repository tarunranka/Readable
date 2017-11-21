import React, {Component} from 'react';
import {connect} from 'react-redux';
import PostForm from '../components/PostForm';
import Header from '../components/Header';
import {fetchCategories} from '../actions';
import {withRouter} from 'react-router';

class NewPost extends Component {
  state = {
    isAdd: true
  };
  componentDidMount() {
    const {id} = this.props.match.params;
    if (typeof id !== 'undefined') {
      this.setState({isAdd: false});
    }
    this.props.fetchCategories();
  }

  render() {
    console.log(this.props.router);
    return (
      <div>
        {Object.keys(this.props.categories).length !== 0 && (
          <Header {...this.props} />
        )}
        <div className="container">
          {!this.state.isAdd && <h2>Edit a Post</h2>}
          {this.state.isAdd && <h2>Add a Post</h2>}
          {Object.keys(this.props.categories).length !== 0 && (
            <PostForm {...this.props} />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewPost)
);
