import React, {Component} from 'react';
import { Glyphicon } from 'react-bootstrap';

class PostComments extends Component {

  render() {
    const {comments, postId, editComment, deleteComment, voteComment} = this.props

   if (comments === undefined) {
      return <p>Sorry, no comments yet</p>
    }
    else {
      return (
        <ol>
          {comments.filter((c) => c.parentId === postId & c.deleted === false).map((c)=>
            <li key={c.id}>
              <p>{c.body}</p>
              <span className="comment-author">By: {c.author}</span>
              <span className="comment-score">Vote Score: {c.voteScore}</span>
              <button class="upVote" onClick={(event)=> voteComment(c.id, 'upVote')}><Glyphicon glyph="thumbs-up" /> </button>
              <button class="downVote" onClick={(event)=> voteComment(c.id, 'downVote')}><Glyphicon glyph="thumbs-down" /> </button>
              <button class="editComment" onClick={(event)=> editComment(c.id, c.author, c.body, c.voteScore)}>Edit Comment</button>
               <button class="deleteComment" onClick={(event)=> deleteComment(c.id)}>Delete Comment</button>
            </li>
          )}
        </ol>
     )}

  }
}


export default PostComments;