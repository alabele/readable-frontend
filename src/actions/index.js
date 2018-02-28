import {url, auth} from '../utils/api'
import fetch from 'cross-fetch'
export const GET_CATEGORY_POSTS = "GET_CATEGORY_POSTS"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
//export const GET_CATEGORY_POSTS = "GET_CATEGORY_POSTS"
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const GET_COMMENTS = "GET_COMMENTS"
export const ADD_POST = "ADD_POST"
export const UPDATE_POST = "UPDATE_POST"
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"




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


////////////////END WORKING SECTION


export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments,
});

export function fetchComments(id) {
	console.log("COMMENTS", id)
  return dispatch => {
    return fetch(url + "posts/" + id +"/comments", auth)
  		.then((response) => {
			return response.json()
			})
		.then(json => dispatch(receiveComments(json)))
	}

}


//When user uses dropdown menu to filter posts by category
export const getCategoryPosts = posts => ({
  type: GET_CATEGORY_POSTS,
  posts
});

export function fetchCategoryPosts(category) {
  return dispatch => {
    return fetch(url + category + "/posts", auth)
  		.then((response) => {
			return response.json()
			})
		.then(json => dispatch(getCategoryPosts(json)))
		//.then(postData => console.log(postData))
	}
}

export const addPost = ( newPost ) => ({
  type: ADD_POST,
  	newPost
});

export function createNewPost(title, body, author, category, id, timestamp) {
	const postData = {
		title: title,
		body: body,
		author: author,
		category: category,
		id: id,
		timestamp: timestamp,

	}
	const fetchData = {
		method: 'POST',
		body: JSON.stringify(postData),
		headers: {
			'Authorization': 'howdy-from-atx',
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			 },
	}
  return dispatch => {
    return fetch(url + "posts", fetchData)
  		.then((response) => {
			return response.json()
			})
		.then(json => dispatch(addPost(json)))
		.then(postData => console.log(postData))


	}
}


export const updatePost = ( newPost ) => ({
  type: UPDATE_POST,
  	newPost
});

export function editPost(title, body, id) {
	const postData = {
		title: title,
		body: body,
	}
	const fetchData = {
		method: 'PUT',
		body: JSON.stringify(postData),
		headers: {
			'Authorization': 'howdy-from-atx',
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			 },
	}
  return dispatch => {
    return fetch(url + "posts/" + id, fetchData)
  		.then((response) => {
			return response.json()
			})
		.then(json => dispatch(addPost(json)))
		.then(postData => console.log(postData))
	}
}


// When user adds a new post
// export function addPost () {
//   return {
//     type: ADD_POST,
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
