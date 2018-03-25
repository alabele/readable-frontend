import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../css/style.css';
//import {fetchCategories, fetchPosts} from '../utils/api'
import {fetchCategories, fetchPosts, fetchCategoryPosts, createNewPost, votingPost} from '../actions'
import CategoryPage from './CategoryPage'
import SinglePost from './SinglePost'
import AddPost from './AddPost'
import {Route} from 'react-router-dom'
import { connect } from 'react-redux'
import {Link, Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class App extends Component {
  state = {
    //categories: [],
   // posts: [],
    path: 'default',
    orderBy: "default",
  }

getPath() {
  const path = window.location.pathname.split('/')
  return path
}

 componentDidMount() {
    const { dispatch } = this.props
    const path = window.location.pathname.split('/')
    dispatch(fetchCategories())
    dispatch(fetchPosts())
}


//  componentDidMount() {
//     const { dispatch } = this.props
//     dispatch(fetchCategories())
//     dispatch(fetchPosts())
// }

modifyOrder(filter) {
  this.setState({orderBy: filter});
}

// Up Vote or Down Vote post to Redux Store
voteOnPost(id, vote) {
    const { dispatch } = this.props
    dispatch(votingPost(id, vote))
    alert("Thanks for "+ vote +" this post!")
}

fetchPostsByCategory(category) {
  const { dispatch } = this.props
 // dispatch(fetchCategoryPosts(category))
  console.log("WE DID IT!" + category)
}

  render() {
    let cat1 = this.props.categories
    let categoryUrls = []
    if (cat1 != undefined) {
       categoryUrls = cat1
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Route path="/" exact render={() => (
           <CategoryPage
              posts={this.props.posts.list}
              orderBy={this.state.orderBy}
              categories={this.props.categories}
              fetchCategoryPosts= {(category)=> {
                this.fetchPostsByCategory(category)
              }}
              votePost={(id, vote)=> {
                this.voteOnPost(id, vote)
              }}
              modifyOrder={(filter)=> {
                this.modifyOrder(filter)
              }}
              path='default'
            />
         )} />
        <Route path="/category/"  render={() => (
          <div>
           <h1 >HOWDAY YOU FOUND CATEGORIES</h1>
           <CategoryPage
              posts={this.props.posts.list}
              orderBy={this.state.orderBy}
              categories={this.props.categories}
              modifyOrder={(filter)=> {
                this.modifyOrder(filter)
              }}
              fetchCategoryPosts= {(category)=> {
                this.fetchPostsByCategory(category)
              }}
              votePost={(id, vote)=> {
                this.voteOnPost(id, vote)
              }}
              path='redux'
            />
            </div>
         )} />
        <Route path="/category/"  render={() => (
          <div>
           <h1 >HOWDAY YOU FOUND REACT</h1>
           <CategoryPage
              posts={this.props.posts.list}
              orderBy={this.state.orderBy}
              categories={this.props.categories}
              modifyOrder={(filter)=> {
                this.modifyOrder(filter)
              }}
              fetchCategoryPosts= {(category)=> {
                this.fetchPostsByCategory(category)
              }}
              votePost={(id, vote)=> {
                this.voteOnPost(id, vote)
              }}
              path='react'
            />
            </div>
         )} />
        <Route path="/posts/"  render={() => (
          <div>
           <SinglePost
              dispatch = {this.props.dispatch}
              comments={this.props.comments}
              votePost={(id, vote)=> {
                this.voteOnPost(id, vote)
              }}
              deletePost={(id)=> {
                this.deletePost(id)
              }}
            />
            </div>
         )} />
        <Route path="/create"  render={() => (
          <div>
           <AddPost
              createPost={(title, body, author, category, id, timestamp)=> {
                this.createPost(title, body, author, category, id, timestamp)
              }}
              categories={this.props.categories}
              dispatch = {this.props.dispatch}
            />
            </div>
         )} />
        <footer>
          <span>Photo by Kelly Sikkema on Unsplash</span>
        </footer>
      </div>
    );
  }
}


function mapStateToProps({categories, posts, comments}) {
  return {
    categories: categories.list,
    posts: posts,
    comments: comments.list,
    //comments: comments.list.item,
    //Going to need to add comments as an objec to each postID
  }
}


export default withRouter(connect(
  mapStateToProps,
)(App))
