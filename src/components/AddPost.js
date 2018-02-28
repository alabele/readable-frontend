import React, {Component} from 'react'
import {createNewPost} from "../actions"
import {fetchSinglePost} from '../utils/api'
//import 'uuid/v4' from 'uuid'

const uuidv4 = require('uuid/v4');

class AddPost extends Component {

	state = {
		titleValue: '',
		bodyValue: '',
		authorValue: '',
		categoryValue: 'none',
		editPost: false,
		//editPostId: '',
		postId: uuidv4(),
		postDate: Date.now()
	}

componentDidMount() {
	//Get the Post ID from the URL
  const path = window.location.pathname.split('/')[2]
  if (path !== undefined) {
  	fetchSinglePost(path).then((post)=> {
  	  this.setState({
  	  	editPost: true,
   		postId:path,
  		titleValue: post.title,
		bodyValue: post.body,
		authorValue: post.author,
		categoryValue: post.category,
		postDate: post.timestamp,
  	  })
   })
  }
}

// Add post to Redux Store
createPost(title, body, author, category, id, timestamp) {
  const { dispatch } = this.props
    dispatch(createNewPost(title, body, author, category, id, timestamp))
    //console.log(title)
    alert("Thanks for submitting your post!")
    this.setState({
      	titleValue: '',
		bodyValue: '',
		authorValue: '',
		categoryValue: 'none',
    });
}


	//Thx React Docs! https://reactjs.org/docs/forms.html
 	handleInputChange = this.handleInputChange.bind(this);

  	handleInputChange(event) {
	    const target = event.target;
	    const value =  target.value;
	    const name = target.name;
	    //console.log(value)
	    this.setState({
	      [name]: value
	    });
	  }

	render() {
		//const date = Date.now()
		const {titleValue, bodyValue, authorValue, categoryValue, postDate, postId} = this.state
		const uuidv4 = require('uuid/v4');
		let myuuid = uuidv4()
		// Thx React Docs! https://reactjs.org/docs/conditional-rendering.html
		let categorySelect = null;
		    if (this.props.categories === undefined) {
		      categorySelect =
		      			<select value={this.state.value} >
			          		<option value="No Categories" disabled>No Categories</option>
				        </select>;
		    } else {
		      categorySelect =
		      		<select value={categoryValue} name="categoryValue" onChange={this.handleInputChange}>
			          <option value="none" disabled>Select Category</option>
			          {this.props.categories.map((category) =>
				          <option key={category.path} value={category.path}>{category.name}</option>
			          )}
			        </select>;
		    }


		return(
			<div>
				<h1>Add New Post</h1>
				{console.log(myuuid)}
				<label>Post Title:</label><input type="text" value={titleValue} name="titleValue" onChange={this.handleInputChange}></input>
				<label>Author:</label><input type="text" value={authorValue} name="authorValue" onChange={this.handleInputChange}></input>
				<label>Category:{categorySelect}</label>
				<label>
      				Post:
          			<textarea type="text" value={bodyValue} name="bodyValue" onChange={this.handleInputChange} />
        		</label>
				<button onClick={(event)=> this.createPost(titleValue, bodyValue, authorValue, categoryValue, postId, postDate)}>SUBMIT</button>
			</div>
			)
	}


}

export default AddPost