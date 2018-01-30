import {url, auth} from '../utils/api'
import fetch from 'cross-fetch'
//export const GET_CATEGORY_POSTS = "GET_CATEGORY_POSTS"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
//export const FETCH_CATEGORIES = "FETCH_CATEGORIES"
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"




////////////// THIS IS WORKING IN COMPONENTDIDMOUNT!
export function fetchCategories() {
  return dispatch => {
    //dispatch(requestPosts())
    return fetch(url + "categories", auth)
  		.then((response) => {
			return response.json()
			})
		.then(json => dispatch(receiveCat(json.categories)))
	}
}

export const receiveCat = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});
////////////////END WORKING SECTION

export function fetchPosts() {
  return dispatch => {
    return fetch(url + "posts", auth)
  		.then((response) => {
			return response.json()
			})
		.then(json => dispatch(receivePosts(json)))
	}
}

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});


// When user uses dropdown menu to filter posts by category
// export function getCategoryPosts ({category}) {
//   return {
//     type: GET_CATEGORY_POSTS,
//     category,
//   }
// }
// When user adds a new post
// export function addPost () {
//   return {
//     type: ADD_POST,
//   }
// }





// When user adds a new post
// export function receiveAllPosts(json) {
//   return {
//     type: RECEIVE_POSTS,
//     posts: json.data.children.map(child => child.data),
//   }
// }



// export function fetchPostsIfNeeded() {
//   return dispatch => {
//     //dispatch(requestPosts())
//     return fetch(url + "posts", auth)
//       .then(response => response.json())
//       .then(json => dispatch(receiveAllPosts(json)))
//   }
// }


/*NOT WORKING*/

// export function fetchAllCategories (json) {
//   return {
//     type: FETCH_CATEGORIES,
//     categories: json,
//   }
// }

// export const fetchCat = () => dispatch => (
//   fetch(url + "categories", auth)
//       .fetchCat()
//       .then(categories => dispatch(receiveCat(categories)))
// );
