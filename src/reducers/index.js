import { combineReducers } from 'redux'

import {
  GET_CATEGORY_POSTS,
  ADD_POST,
  RECEIVE_POSTS,
  //FETCH_CATEGORIES,
  RECEIVE_CATEGORIES,
  RECEIVE_COMMENTS,
} from '../actions'



function posts (state = {} , action) {
  const {posts, newPost } = action
  // const {myPost = state.list.filter(c =>c.id === id)}
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        list: posts,
      }
    case GET_CATEGORY_POSTS:
      return {
        ...state,
        list: posts,
      }
    case ADD_POST:
      return {
        ...state,
        list: state.list.concat(newPost)
      }
    default :
      return state
  }
}

function categories (state = {} , action) {
  const { categories } = action
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      // return Object.assign({}, state, {
      //   items: action.categories,
      // })
      return {
        ...state,
         list: categories
      }
    default :
      return state
  }
}


function comments (state = {} , action) {
  const {comments} = action
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        list: comments
      }
    default :
      return state
  }
}


export default combineReducers({
  posts,
  categories,
  comments,
})