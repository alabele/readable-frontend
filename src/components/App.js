import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../css/style.css';
//import {fetchCategories, fetchPosts} from '../utils/api'
import {fetchCategories, fetchPosts, fetchCategoryPosts, votingPost} from '../actions'
import CategoryPage from './CategoryPage'
import SinglePost from './SinglePost'
import ErrorPage404 from './ErrorPage404'
import AddPost from './AddPost'
import {Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class App extends Component {
  state = {
    //categories: [],
   // posts: [],
    urlPath: '',
    orderBy: "default",
  }

// getCategoryPath() {
//   let path = window.location.pathname.split('/')
//   if (path[2] !== undefined && path[1] === 'category') {
//     path = path[2]
//     console.log("found category", path);
//   }
//   return path
// }

 componentDidMount() {
    const { dispatch } = this.props
    //const path = window.location.pathname.split('/')[2]
    //this.setState({urlPath: path})
    //check URL to determine what page
    const path = window.location.pathname.split('/')
    //if default url, fetch posts
    //this.setState({urlPath: path})
   // console.log("state", this.state)
    // get categories for navigation
    dispatch(fetchCategories())
    dispatch(fetchPosts())
    //Fetch post using API, and set local state of currentPost
    //dispatch(fetchCategoryPosts(path))
    // if (path[1] === "") {
    //   dispatch(fetchPosts())
    //   console.log("found category", path);
    // }
    //if category url, fetch category posts
     if (path[2] !== undefined && path[1] === 'category') {
        console.log("found category", path[2]);
        let category = path[2]
        //dispatch(fetchPosts())
        dispatch(fetchCategoryPosts(category))
       // this.setState({urlPath: category})
     }

}

componentDidUpdate() {
  const { dispatch } = this.props
  const path = window.location.pathname.split('/')
  if (path[2] !== undefined && path[1] === 'category') {
      console.log("found category via ComponentDidUpdate", path[2]);
      let category = path[2]
      dispatch(fetchCategoryPosts(category)).then((category)=> {
        //this.setState({urlPath: category})
      })
     }
}


modifyPath(url) {
  this.setState({urlPath: url});
}

modifyOrder(filter) {
  this.setState({orderBy: filter});
}

// Up Vote or Down Vote post to Redux Store
voteOnPost(id, vote) {
    const { dispatch } = this.props
    dispatch(votingPost(id, vote))
    alert("Thanks for "+ vote +" this post!")
}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Switch>
        <Route path="/" exact render={() => (
           <CategoryPage
              dispatch = {this.props.dispatch}
              posts={this.props.posts.list}
              orderBy={this.state.orderBy}
              categories={this.props.categories}
              fetchCategory= {(category)=> {
                this.fetchPostsByCategory(category)
              }}
              votePost={(id, vote)=> {
                this.voteOnPost(id, vote)
              }}
              modifyOrder={(filter)=> {
                this.modifyOrder(filter)
              }}
               modifyPath={(url)=> {
                this.modifyPath(url)
              }}
              urlPath={this.state.urlPath}
              categoryFilter='none'
            />
         )} />
        <Route path="/category/"  render={() => (
           <CategoryPage
              dispatch = {this.props.dispatch}
              posts={this.props.posts.categoryList}
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
              modifyPath={(url)=> {
                this.modifyPath(url)
              }}
              urlPath={this.state.urlPath}
              categoryFilter={this.state.urlPath}
            />
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
           <AddPost
              createPost={(title, body, author, category, id, timestamp)=> {
                this.createPost(title, body, author, category, id, timestamp)
              }}
              categories={this.props.categories}
              dispatch = {this.props.dispatch}
            />
         )} />
        <Route component={ErrorPage404}/>
        </Switch>
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
  }
}


export default withRouter(connect(
  mapStateToProps,
)(App))
