import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container">
      <h1>Oops! Page not found. Try again</h1>
      <Link className="btn btn-primary" to="/">
        All Post
      </Link>
    </div>
  );
}

export default NotFound;
