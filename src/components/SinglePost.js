import React, {Component} from 'react';
import Modal from 'react-modal'
import {fetchSinglePost} from '../utils/api'
import {fetchComments, deleteCurrentPost, deleteComment, voteComment} from '../actions'
import PostComments from './PostComments'
import {Link} from 'react-router-dom'
import AddComment from './AddComment'
import { Glyphicon } from 'react-bootstrap';

const uuidv4 = require('uuid/v4');

class SinglePost extends Component {
  state = {
    modalOpen: false,
    postId: '',
    currentPost: {},
    currentCommentId: uuidv4(),
    commentBodyValue: '',
    commentAuthorValue: '',
    commentVoteScore: 1,
    commentTimestamp: Date.now(),
    editComment: false,
    commentDeleted: false,
  }

getPostID() {
  const path = window.location.pathname.split('/')[2]
  return path
}

// Delete post to Redux Store
deletePost(id) {
  const { dispatch } = this.props
    dispatch(deleteCurrentPost(id))
    alert("Thanks for deleting your post!")
    this.setState({
      postId: '',
      currentPost: {},
      deleted: false,
    });
}

// Delete comment to Redux Store
deleteComment(id) {
  const { dispatch } = this.props
    dispatch(deleteComment(id))
    alert("Thanks for deleting your comment!")
}

// Up Vote or Down Vote comment to Redux Store
voteOnComment(id, vote) {
  const { dispatch } = this.props
    dispatch(voteComment(id, vote))
    alert("Thanks for "+ vote +" your comment!")
}

componentDidMount() {
  //Get the Post ID from the URL
  const path = window.location.pathname.split('/')[2]
  //Set local state for postId
  this.setState({postId: path})
  //Fetch post using API, and set local state of currentPost
  fetchSinglePost(path).then((post)=> {
    this.setState({currentPost: post})
  })
  //Fetch comments
  const { dispatch } = this.props
   dispatch(fetchComments(path))

   Modal.setAppElement('body');
}


addCommentsModal = () => this.setState(() => ({ modalOpen: true}))
editCommentsModal = ( id, author, body, voteScore) => this.setState(() => ({ modalOpen: true,  editComment: true, currentCommentId: id, commentBodyValue:body, commentAuthorValue:author, commentVoteScore: voteScore }))
closeCommentsModal = () => this.setState(() => ({ modalOpen: false }))

  render() {
    const { modalOpen, postId, currentPost } = this.state
    let theDate = Date(currentPost.timestamp)
    theDate = theDate.toString()
    //const uuidv4 = require('uuid/v4');
    //let myuuid = uuidv4()
    const {votePost} = this.props

    return (
      <div className='single-post-page'>
      {console.log('MODAL STATE', modalOpen)}
      <div className='container'>
        <div className='nav'>
           <h1 className='header'>{currentPost.title}</h1>
           <Link to={'/create/' + currentPost.id}>
              <button className='edit-post'>Edit Post
              </button>
           </Link>
           <button
             className='delete-post'
             onClick={(event)=> this.deletePost(postId)}>
               Delete Post
           </button>
           <button
             className='add-comment'
             onClick={(event)=> this.addCommentsModal()}>
             <Glyphicon glyph="plus" />
               Add Comment
           </button>
         </div>
         <div className='post-body'>
              <span className="post-category">{currentPost.category}</span>
              <span className="post-timestamp">{theDate}</span>
              <span className="post-author">Written by: {currentPost.author}</span>
              <p>{currentPost.body}</p>
              <div className="post-vote-score">
                <span className="vote-score-header">Vote Score: {currentPost.voteScore}</span>
                <button className="upVote" onClick={(event)=> votePost(currentPost.id, 'upVote')}><Glyphicon glyph="thumbs-up" /> </button>
                <button className="downVote" onClick={(event)=> votePost(currentPost.id, 'downVote')}><Glyphicon glyph="thumbs-down" /> </button>
              </div>
              <div className="comments-list">
                <span>There are {currentPost.commentCount} Comment(s)</span>
              </div>
             <div className="post-comments">
               <PostComments
                  dispatch={this.props.dispatch}
                  postId={this.state.postId}
                  comments={this.props.comments}
                  commentId={this.state.currentCommentId}
                  editComment={(id, author, body, voteScore)=> {
                    this.editCommentsModal(id, author, body, voteScore)
                  }}
                  deleteComment={(id)=> {
                    this.deleteComment(id)
                  }}
                  voteComment={(id, vote)=> {
                    this.voteOnComment(id, vote)
                  }}
                  // edit={this.state.editComment}
               />
             </div>
         </div>
         <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={this.closeCommentsModal}
          contentLabel='Modal'
        >
          <div>
            <button
             className='close-modal'
             onClick={this.closeCommentsModal}>
               <Glyphicon glyph="remove" />
           </button>
          </div>
          <AddComment
              dispatch={this.props.dispatch}
              postId={this.state.postId}
              commentId = {this.state.currentCommentId}
              commentAuthor = {this.state.commentAuthorValue}
              commentBody = {this.state.commentBodyValue}
              commentVoteScore = {this.state.commentVoteScore}
              commentTimestamp ={this.state.commentTimestamp}
              onRequestClose={this.closeCommentsModal}
              edit={this.state.editComment}
              //comments={this.props.comments}
           />
        </Modal>

      </div>
      </div>
    )
  }
}


export default SinglePost;