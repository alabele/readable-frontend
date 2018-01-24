import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { fetchCategories, fetchPosts } from '../utils/api'
import CategoryPage from './CategoryPage'
import {Route} from 'react-router-dom'
//import {Link, Route, Switch} from 'react-router-dom'

class App extends Component {
  state = {
    categories: [],
    posts: [],
    orderBy: "default",
  }
  componentDidMount() {
    fetchCategories().then((categories)=> {
      this.setState({categories})
    })
    fetchPosts().then((posts)=> {
      this.setState({posts})
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Route path="/" exact render={() => (
           <CategoryPage
              posts={this.state.posts}
              orderBy={this.state.orderBy}
              categories={this.state.categories}
            />
         )} />
      </div>
    );
  }
}

export default App;
