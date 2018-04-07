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
export const DELETE_POST = "DELETE_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const VOTE_COMMENT = "VOTE_COMMENT"
export const VOTE_POST = "VOTE_POST"


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

//Fetch Posts
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



//Fetch Comments

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
export const getCategoryPosts = (posts) => ({
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
		.then(json => console.log("FETCH CATEGORY POSTS", json))
	}
}

//Add post
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
		//.then(postData => console.log(postData))
	}
}

//EDIT POST
export const updatePost = ( { title, body, id } ) => ({
  type: UPDATE_POST,
  	title,
  	body,
  	id
});

export function editPost(title, body, id) {
	const postData = {
		title: title,
		body: body,
		id: id
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
		.then(json => dispatch(updatePost(json)))
		//.then(postData => console.log("UPDATE POST" , postData))
	}
}

//DELETE POST

export const deletePost = ( post) => ({
  type: DELETE_POST,
  post
});

export function deleteCurrentPost(id) {
	const postData = {
		deleted: true,
	}
	const fetchData = {
		method: 'DELETE',
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
		.then(json => dispatch(deletePost(json)))
		//.then(postData => console.log("DELETED POST", postData))
	}

}

// ADD COMMENT

export const addComment = ( newComment ) => ({
  type: ADD_COMMENT,
  	newComment
});

export function createNewComment(body, author, commentId, parentId, timestamp) {
	const commentData = {
		body: body,
		author: author,
		id: commentId,
		parentId: parentId,
		timestamp: timestamp,
		voteScore: 0,
		deleted: false,
		parentDeleted: false
	}
	const fetchData = {
		method: 'POST',
		body: JSON.stringify(commentData),
		headers: {
			'Authorization': 'howdy-from-atx',
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			 },
	}
  return dispatch => {
    return fetch(url + "comments", fetchData)
  		.then((response) => {
			return response.json()
			})
		.then(json => dispatch(addComment(json)))
	}
}

//EDIT COMMENT
export const updateComment = ( { id, body, timestamp } ) => ({
  type: UPDATE_COMMENT,
  	id,
  	body,
  	timestamp
});

export function editExistingComment(id, body, timestamp) {
	const commentData = {
		timestamp: timestamp,
		body: body,
	}
	const fetchData = {
		method: 'PUT',
		body: JSON.stringify(commentData),
		headers: {
			'Authorization': 'howdy-from-atx',
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			 },
	}
  return dispatch => {
    return fetch(url + "comments/" + id, fetchData)
  		.then((response) => {
			return response.json()
			})
		.then(json => dispatch(updateComment(json)))
		.then(commentData => console.log("WE EDITED THIS COMMENT", commentData))
	}
}

//DELETE COMMENT
export const deleteExistingComment = ( { id } ) => ({
  type: DELETE_COMMENT,
  	id,
});

export function deleteComment(id) {
	const commentData = {
		deleted: true,
	}
	const fetchData = {
		method: 'DELETE',
		body: JSON.stringify(commentData),
		headers: {
			'Authorization': 'howdy-from-atx',
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			 },
	}
  return dispatch => {
    return fetch(url + "comments/" + id, fetchData)
  		.then((response) => {
			return response.json()
			})
		.then(json => dispatch(deleteExistingComment(json)))
	}
}


//VOTE COMMENT
export const voteOnComment = ( {id, vote } ) => ({
  type: VOTE_COMMENT,
  	id,
  	vote,
});

export function voteComment(id, vote) {
	const commentData = {
		option: vote,
	}
	const fetchData = {
		method: 'POST',
		body: JSON.stringify(commentData),
		headers: {
			'Authorization': 'howdy-from-atx',
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			 },
	}
  return dispatch => {
    return fetch(url + "comments/" + id, fetchData)
  		.then((response) => {
			return response.json()
			})
		.then(json => dispatch(voteOnComment({id,vote})))
		.then(console.log("VOTE", vote))
		.then(jackie => console.log("WE COMMENTED THIS COMMENT", jackie))
	}
}

//VOTE Post
export const voteOnPost = ( {id, vote}  ) => ({
  type: VOTE_POST,
  	id,
  	vote,
});

export function votingPost(id, vote) {
	const commentData = {
		option: vote,
	}
	const fetchData = {
		method: 'POST',
		body: JSON.stringify(commentData),
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
		.then(json => dispatch(voteOnPost({id,vote})))
		//.then(console.log("POST VOTE", vote))
	}
}