import { combineReducers } from 'redux'

import {
  GET_CATEGORY_POSTS,
  ADD_POST,
  UPDATE_POST,
  UPDATE_COMMENT,
  RECEIVE_POSTS,
  DELETE_POST,
  //FETCH_CATEGORIES,
  RECEIVE_CATEGORIES,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  VOTE_POST
} from '../actions'



function posts (state = {} , action) {
  const {posts, newPost, vote } = action
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
        categoryList: posts,
      }
    case ADD_POST:
      return {
        ...state,
       list: state.list.concat(newPost)
      }
    case UPDATE_POST:
    return {
        list: state.list.map((item) => {
          if (item.id === action.id) {
            return { ...state.list.item,
              body: action.body,
              title: action.title
            }
          }
          //return item
        })
    }
    case VOTE_POST:
      return {
        ...state,
          list: state.list.map((item) => {
            if (item.id === action.id) {
              let currentVote = item.voteScore
              let voteIncrement = 1
              if (vote === "downVote") {
                voteIncrement = -1
              }
              return Object.assign({}, item, {
                voteScore: currentVote + voteIncrement
              })
            }
            return item
          })
      }
    case DELETE_POST:
      return {
        ...state,
      }
    default :
      return state
  }
}

function categories (state = {} , action) {
  const { categories } = action
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
         list: categories
      }
    default :
      return state
  }
}


function comments (state = {} , action) {
  const {comments, newComment, body, timestamp, vote} = action
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        list: comments
      }
    case ADD_COMMENT:
      return {
        ...state,
        list: state.list.concat(newComment)
      }
     case UPDATE_COMMENT:
      return Object.assign({}, state, {
        list: state.list.map((item) => {
          if (item.id === action.id) {
            return Object.assign({}, item, {
              body: body,
              timestamp: timestamp
            })
          }
          return item
        })
      })
    case DELETE_COMMENT:
      return Object.assign({}, state, {
        list: state.list.map((item) => {
          if (item.id === action.id) {
            return Object.assign({}, item, {
              deleted: true,
            })
          }
          return item
        })
      })
     case VOTE_COMMENT:
      return {
        ...state,
          list: state.list.map((item) => {
            if (item.id === action.id) {
              let currentVote = item.voteScore
              let voteIncrement = 1
              if (vote === "downVote") {
                voteIncrement = -1
              }
              return Object.assign({}, item, {
                voteScore: currentVote + voteIncrement
              })
            }
            return item
          })
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