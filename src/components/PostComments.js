import React, {Component} from 'react';
import Modal from 'react-modal'
import {fetchComments} from '../actions'

class PostComments extends Component {
  state = {
    foodModalOpen: false,
  }

//openFoodModal = () => this.setState(() => ({ foodModalOpen: true }))
//closeFoodModal = () => this.setState(() => ({ foodModalOpen: false }))

  render() {
    const {comments, postId} = this.props

   if (comments === undefined) {
      return <p>Sorry, no comments yet</p>
    }
    else {
      return (
        <ol>
          {comments.filter((c) => c.parentId === postId).map((c)=>
            <li key={c.id}>
              <p>{c.body}</p>
              <span className="comment-author">By: {c.author}</span>
              <span className="comment-score">Vote Score: {c.voteScore}</span>
              <button id="upVote">Up Vote</button>
              <button id="downVote">Down Vote</button>
            </li>
          )}
        </ol>
     )}

    return (
      <div className='container'>

      </div>
    )
  }
}


export default PostComments;