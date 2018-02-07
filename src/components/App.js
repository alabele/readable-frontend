import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
//import {fetchCategories, fetchPosts} from '../utils/api'
import {fetchCategories, fetchPosts, fetchCategoryPosts, createNewPost} from '../actions'
import CategoryPage from './CategoryPage'
import SinglePost from './SinglePost'
import AddPost from './AddPost'
import {Route} from 'react-router-dom'
import { connect } from 'react-redux'
//import {Link, Route, Switch} from 'react-router-dom'

class App extends Component {
  state = {
    //categories: [],
   // posts: [],
    orderBy: "default",
  }

 componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
    dispatch(fetchPosts())
    //console.log( "Dispatch", dispatch)
  }

modifyOrder(filter) {
  this.setState({orderBy: filter});
}

fetchPostsByCategory(category) {
   //const { dispatch } = this.props
   //dispatch(fetchCategoryPosts(category))
  console.log("WE DID IT!" + category)
}

  render() {
    console.log("Props", this.props)
    console.log("ORDER BY STATE", this.state.orderBy)
    let cat1 = this.props.categories
    //console.log(this.props.categories.list)
    let categoryUrls = []
    if (cat1 != undefined) {
       categoryUrls = cat1
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {console.log("MY CATEGORIES", cat1)}
        <Route path="/" exact render={() => (
           <CategoryPage
              posts={this.props.posts.list}
              orderBy={this.state.orderBy}
              categories={this.props.categories}
              fetchCategoryPosts= {(category)=> {
                this.fetchPostsByCategory(category)
              }}
              modifyOrder={(filter)=> {
                this.modifyOrder(filter)
              }}
              path='default'
            />
         )} />
        <Route path="/redux"  exact render={() => (
          <div>
           <h1 >HOWDAY YOU FOUND REDUX</h1>
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
              path='redux'
            />
            </div>
         )} />
        <Route path="/react" exact render={() => (
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
              path='react'
            />
            </div>
         )} />
        <Route path="/post/8xf0y6ziyjabvozdd253nd" exact render={() => (
          <div>
           <SinglePost
              dispatch = {this.props.dispatch}
              comments={this.props.comments}
            />
            </div>
         )} />
        <Route path="/add-post" exact render={() => (
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

      </div>
    );
  }
}


function mapStateToProps({categories, posts, comments}) {
  return {
    categories: categories.list ,
    posts: posts,
    comments: comments.list,
    //Going to need to add comments as an objec to each postID
  }
}


export default connect(
  mapStateToProps,
)(App)
