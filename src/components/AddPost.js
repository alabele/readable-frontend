import React, {Component} from 'react'
//import {createNewPost} from "../actions"

class AddPost extends Component {
	state = {

	}





	render() {
		const date = Date.now()
		return(
			<div>
				<h1>Add New Post</h1>
				<label>Post Title:</label><input type="text" value="title"></input>
				<button onClick={(event)=> this.props.createPost("My New Post", "here is body copy", "Lauren", "redux", 1235669, date)}>SUBMIT</button>
			</div>
			)
	}


}

export default AddPost