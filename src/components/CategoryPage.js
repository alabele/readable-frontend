import React from 'react';
import CategoryList from './CategoryList'
import PostList from './PostList'
import OrderByForm from './OrderByForm'
import {Link} from 'react-router-dom'

function CategoryPage(props) {
    return (
      <div className="category-page">
        <div className="all-categories">
          <CategoryList
            categories={props.categories}
          />
        </div>
        <div className="add-post">
          <Link
            to="/add-post">
            Add a post
          </Link>
        </div>
        <div className="all-posts">
          <h1>Check out these awesome posts!</h1>
          <OrderByForm
            orderBy={props.orderBy}
          />
          <PostList
            posts={props.posts}
            orderBy={props.orderBy}
          />
        </div>
      </div>
    );
}

export default CategoryPage;
