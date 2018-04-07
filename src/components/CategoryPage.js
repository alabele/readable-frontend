import React, {Component} from 'react';
import CategoryList from './CategoryList'
import PostList from './PostList'
import OrderByForm from './OrderByForm'
import {Link} from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap';
//import {fetchCategoryPosts} from '../actions'



class CategoryPage extends Component {


render() {
  const {posts, orderBy, categories, modifyOrder, urlPath, votePost, modifyPath} = this.props;
    return (
      <div className="category-page">
        <div className="page-inner">
          <div className="all-categories">
            <CategoryList
              categories={categories}
              myFunc={modifyPath}
              urlPath= {urlPath}
            />
          </div>
          <div className="add-post">
            <Link
              to="/create">
              <Glyphicon glyph="plus" />
              Add a post
            </Link>
          </div>
          <div className="all-posts">
            <h1>My Posts: Words to live by</h1>
            <OrderByForm
              orderBy={orderBy}
              myFunc={modifyOrder}
            />
            <PostList
              posts={posts}
              votePost={votePost}
              orderBy={orderBy}
            />
          </div>
         </div>
      </div>
    );
  }
}
export default CategoryPage;
