import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  bindCategory(categoryName) {
    this.props.fetchPostsByCategory(categoryName);
  }
  render() {
    const {categories} = this.props;
    const selectedLink = this.props.match.params.category;
    return (
      <header>
        <div className="blog-masthead">
          <div className="container">
            <nav className="nav mr-auto">
              <Link
                className={`${this.props.match.path === '/'
                  ? 'nav-link active'
                  : 'nav-link '} `}
                to="/"
              >
                Home
              </Link>
              {categories.map(category => (
                <Link
                  className={`${category.path === selectedLink
                    ? 'nav-link active'
                    : 'nav-link'} `}
                  to={`/c/${category.path}`}
                  key={category.name}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/new-post"
                className={`${this.props.match.path === '/new-post'
                  ? 'nav-link active'
                  : 'nav-link '} `}
              >
                Create Post
              </Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
