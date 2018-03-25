import React, {Component} from 'react';
import Modal from 'react-modal'
import {fetchComments} from '../actions'

class PostComments extends Component {
  state = {
   modalOpen: false,
  }

  render() {
    const {comments, postId, editComment, deleteComment, voteComment} = this.props

   if (comments === undefined) {
      return <p>Sorry, no comments yet</p>
    }
    else {
      return (
        <ol>
          {comments.filter((c) => c.parentId === postId & c.deleted == false).map((c)=>
            <li key={c.id}>
              <p>{c.body}</p>
              <span className="comment-author">By: {c.author}</span>
              <span className="comment-score">Vote Score: {c.voteScore}</span>
              <button id="upVote" onClick={(event)=> voteComment(c.id, 'upVote')}>Up Vote</button>
              <button id="downVote" onClick={(event)=> voteComment(c.id, 'downVote')}>Down Vote</button>
              <button id="editComment" onClick={(event)=> editComment(c.id, c.author, c.body, c.voteScore)}>Edit Comment</button>
               <button id="deleteComment" onClick={(event)=> deleteComment(c.id)}>Delete Comment</button>
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