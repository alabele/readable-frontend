import React from 'react';
import CategoryList from './CategoryList'
import PostList from './PostList'
import OrderByForm from './OrderByForm'
import {Link} from 'react-router-dom'

function CategoryPage({posts, orderBy, categories, modifyOrder, fetchCategoryPosts, path}) {
    // let new_posts = []
    // if (path === 'default') {

    // } else {
    //   new_posts = fetchCategoryPosts("react")
    // }
    return (
      <div className="category-page">
        <div className="all-categories">
          <CategoryList
            categories={categories}
            myFunc={fetchCategoryPosts}
          />
        </div>
        <div className="add-post">
          <Link
            to="/create">
            Add a post
          </Link>
        </div>
        <div className="all-posts">
          <h1>Check out these awesome posts!</h1>
          <OrderByForm
            orderBy={orderBy}
            myFunc={modifyOrder}
          />
          <PostList
            posts={posts}
            //posts = {new_posts}
            orderBy={orderBy}
          />
        </div>
      </div>
    );
}

export default CategoryPage;
