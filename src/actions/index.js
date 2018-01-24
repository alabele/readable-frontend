export const GET_CATEGORY_POSTS = "GET_CATEGORY_POSTS"
export const ADD_POST = "ADD_POST"

// When user uses dropdown menu to filter posts by category
export function getCategoryPosts ({category}) {
  return {
    type: GET_CATEGORY_POSTS,
    category,
  }
}
// When user adds a new post
export function addPost () {
  return {
    type: ADD_POST,
  }
}