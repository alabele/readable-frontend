import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
//import {fetchCategories, fetchPosts} from '../utils/api'
import {fetchCategories, fetchPosts} from '../actions'
import CategoryPage from './CategoryPage'
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
    console.log( "Dispatch", dispatch)
  }


  render() {
    console.log("Props", this.props)
    //console.log(this.props.categories.list)
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
            />
         )} />
      </div>
    );
  }
}


function mapStateToProps({categories, posts}) {
  return {
    categories: categories.list ,
    posts: posts,
  }
}


export default connect(
  mapStateToProps,
)(App)
