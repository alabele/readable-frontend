import React, {Component} from 'react'
import {createNewComment, editExistingComment} from "../actions"
import {fetchSinglePost} from '../utils/api'
//import 'uuid/v4' from 'uuid'

const uuidv4 = require('uuid/v4');

class AddComment extends Component {

	state = {
		bodyValue: this.props.commentBody,
		authorValue:this.props.commentAuthor,
		// commentId: uuidv4(),
		// parentId: this.props.postId,
		// timestamp: Date.now(),
		// voteScore: 0,
	}


// Add new comment to Redux Store
createComment(body, author, commentId, parentId, timestamp) {
  const { dispatch, onRequestClose} = this.props
  	onRequestClose()
    dispatch(createNewComment(body, author, commentId, parentId, timestamp))
    alert("Thanks for submitting your comment!")
}

// edit existing comment in Redux Store
editComment(id, body, timestamp) {
  	const { dispatch, onRequestClose} = this.props
  	onRequestClose()
    dispatch(editExistingComment(id, body, timestamp))
    alert("Thanks for editting your comment!")
}

//updateComment = this.updateComment();
updateComment() {
	this.setState({
	     bodyValue: "LAUREN IS QWEEN",

    });
    console.log(this.state.bodyValue)
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
		const {bodyValue, authorValue } = this.state
		const {commentBody, commentAuthor, commentId, commentTimestamp, postId, editComment} = this.props
		const uuidv4 = require('uuid/v4');
		let myuuid = uuidv4()
		// Thx React Docs! https://reactjs.org/docs/conditional-rendering.html
		 let submitButton = null;
		     if (this.props.edit === true) {
		      	submitButton =
	      			<button onClick={(event)=> this.editComment(commentId, bodyValue, commentTimestamp)}>
	      			EDIT COMMENT
	      			</button>;
		    }
			else {
		      submitButton =
	      			<button onClick={(event)=> this.createComment(bodyValue, authorValue, commentId, postId, commentTimestamp )}>
	      			ADD COMMENT
	      			</button>;;
		    }


		return(
			<div>
				<h1>Add New Comment</h1>
				<label>Author:</label><input type="text" value={authorValue} name="authorValue" onChange={this.handleInputChange}></input>
				<label>
      				Comment:
          			<textarea type="text" value={bodyValue} name="bodyValue" onChange={this.handleInputChange} />
        		</label>
        		{submitButton}

			</div>
			)
	}


}

export default AddComment