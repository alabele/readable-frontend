import { combineReducers } from 'redux'

import {
  GET_CATEGORY_POSTS,
  ADD_POST,
} from '../actions'

function filterByCategory (state = {}, action) {
  switch (action.type) {
    case ADD_RECIPE :
      const { recipe } = action

      return {
        ...state,
        [recipe.label]: recipe,
      }
    default :
      return state
  }
}


export default combineReducers({
  food,
  calendar,
})