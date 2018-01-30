import { combineReducers } from 'redux'

import {
  //GET_CATEGORY_POSTS,
  //ADD_POST,
  RECEIVE_POSTS,
  //FETCH_CATEGORIES,
  RECEIVE_CATEGORIES,
} from '../actions'



function posts (state = {} , action) {
  const {posts} = action
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        list: posts,
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

export default combineReducers({
  posts,
  categories,
})