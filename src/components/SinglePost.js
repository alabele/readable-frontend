import React, {Component} from 'react';
import Modal from 'react-modal'
import {fetchSinglePost} from '../utils/api'
import {fetchComments, deleteCurrentPost, deleteComment, voteComment} from '../actions'
import PostComments from './PostComments'
import {Link} from 'react-router-dom'
import AddComment from './AddComment'

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
    //console.log(title)
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
    //console.log(title)
    alert("Thanks for deleting your comment!")
    // this.setState({
    //   postId: '',
    //   currentPost: {},
    //   commentDeleted: true,
    // });
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
}

addCommentsModal = () => this.setState(() => ({ modalOpen: true}))
editCommentsModal = ( id, author, body, voteScore) => this.setState(() => ({ modalOpen: true,  editComment: true, currentCommentId: id, commentBodyValue:body, commentAuthorValue:author, commentVoteScore: voteScore }))
closeCommentsModal = () => this.setState(() => ({ modalOpen: false }))

  render() {
    const { modalOpen, loadingFood, food, deleted,  postId, currentPost } = this.state
    let theDate = Date(currentPost.timestamp)
    theDate = theDate.toString()
    const uuidv4 = require('uuid/v4');
    let myuuid = uuidv4()
    const {comments} = this.props
    let commentsArray = []
    //if (currentPost.)

    return (
      <div className='container'>
      {console.log("The Date", theDate)}
        <div className='nav'>
           <h1 className='header'>Singe Post Page {this.state.postId}</h1>
           {console.log("Single Post", this.state.currentPost)}
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
               Add Comment
           </button>
         </div>
         <div className='post-body'>

              <span className="post-category">{currentPost.category}</span>
              <h4>{currentPost.title}</h4>
              <span className="post-timestamp">{theDate}</span>
              {console.log(currentPost.timestamp)}
              <span className="post-author">Written by: {currentPost.author}</span>
              <p>{currentPost.body}</p>
              <span>Vote Score: {currentPost.voteScore}</span>
              <span>There are {currentPost.commentCount} Comment(s)</span>
              {console.log("Timestamp", currentPost.timestamp)}
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
         <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={this.closeCommentsModal}
          contentLabel='Modal'
        >
          <div>
            <h1></h1>
            <button
             className='close-modal'
             onClick={this.closeCommentsModal}>
               Close Modal
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
    )
  }
}


export default SinglePost;