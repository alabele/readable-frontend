import React, {Component} from 'react';
import Modal from 'react-modal'
import {fetchSinglePost} from '../utils/api'
import {fetchComments} from '../actions'
import PostComments from './PostComments'

class SinglePost extends Component {
  state = {
    foodModalOpen: false,
    postId: '',
    currentPost: {},
    //ingredientsModalOpen: false,
  }

getPostID() {
  const path = window.location.pathname.split('/')[2]
  return path
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

openFoodModal = () => this.setState(() => ({ foodModalOpen: true }))
closeFoodModal = () => this.setState(() => ({ foodModalOpen: false }))

  render() {
    const { foodModalOpen, loadingFood, food, ingredientsModalOpen, currentPost } = this.state
    let theDate = Date(currentPost.timestamp)
    theDate = theDate.toString()
    const {comments} = this.props
    let commentsArray = []

    return (
      <div className='container'>
      {console.log("The Date", theDate)}
        <div className='nav'>
           <h1 className='header'>Singe Post Page {this.state.postId}</h1>
           {console.log("Single Post", this.state.currentPost)}
           <button
             className='edit-post'
             onClick={this.openFoodModal}>
               Edit Post
           </button>
           <button
             className='delete-post'
             onClick={this.openFoodModal}>
               Delete Post
           </button>
           <button
             className='add-comment'
             onClick={this.openFoodModal}>
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
           />
         </div>
         <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={foodModalOpen}
          onRequestClose={this.closeFoodModal}
          contentLabel='Modal'
        >
          <div>
            <h1>WOOHOO WE HAVE A MODAL</h1>
            <button
             className='close-modal'
             onClick={this.closeFoodModal}>
               Close Modal
           </button>
          </div>
        </Modal>

      </div>
    )
  }
}


export default SinglePost;