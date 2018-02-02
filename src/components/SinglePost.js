import React, {Component} from 'react';
import Modal from 'react-modal'
import {fetchSinglePost} from '../utils/api'

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
  const path = window.location.pathname.split('/')[2]
  this.setState({postId: path})
  fetchSinglePost(path).then((post)=> {
    this.setState({currentPost: post})
  })
}

openFoodModal = () => this.setState(() => ({ foodModalOpen: true }))
closeFoodModal = () => this.setState(() => ({ foodModalOpen: false }))

  render() {
    const { foodModalOpen, loadingFood, food, ingredientsModalOpen, currentPost } = this.state
    let theDate = Date(currentPost.timestamp)
    theDate = theDate.toString()

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