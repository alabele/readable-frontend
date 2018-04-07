import React  from 'react'
import {Link} from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap';
//With help from: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/

function dynamicSort(filter) {
  return function(a,b) {
    let itemA = a[filter]
    let itemB = b[filter]

    if (typeof itemA === 'string') {
      itemA = itemA.toUpperCase()
    }
    if (typeof itemB === 'string') {
      itemB = itemB.toUpperCase()
    }
    let comparison = 0;
    if (itemA > itemB) {
      comparison = 1;
    } else if (itemA < itemB) {
      comparison = -1;
    }
    return comparison;
    }
}


function PostList({posts,orderBy, votePost}) {

  let showingPosts =[]
  if (orderBy === "default") {
    showingPosts = posts
    }
  else {
    showingPosts = posts.sort(dynamicSort(orderBy))

   }
   //If posts is undefined (i.e. the API hasn't been called yet)
	if (posts === undefined || posts.length === 0) {
    return <p>No posts found :(</p>
  }
  //If posts array exists (i.e. API has been called)
  else {
		return (
      <ol className="posts-list">
        {showingPosts.map((p) =>
            <li key={p.id}>
              <Link to={'/posts/' + p.id}><h4>{p.title}</h4></Link>
              <div className="post-category">{p.category}</div>
              <div className="post-timestamp">{Date(p.timestamp).toString()}</div>
              <p>{p.body}</p>
              <div className="voteScore">Vote Score: {p.voteScore}</div>
              <button className="upVote" onClick={(event)=> votePost(p.id, 'upVote')}><Glyphicon glyph="thumbs-up" /> </button>
              <button className="downVote" onClick={(event)=> votePost(p.id, 'downVote')}><Glyphicon glyph="thumbs-down" /> </button>
              <div className="commentCount">There are {p.commentCount} Comment(s)</div>
            </li>
          )}
      </ol>
		)
  }
}



export default PostList