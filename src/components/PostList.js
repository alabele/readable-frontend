import React  from 'react'
import {Link} from 'react-router-dom'
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
  console.log("Post List Props", posts)

  let showingPosts =[]
  if (orderBy === "default") {
    showingPosts = posts
    }
  else {
    showingPosts = posts.sort(dynamicSort(orderBy))

   }
   //If posts is undefined (i.e. the API hasn't been called yet)
	if (posts === undefined) {
    return <p>No posts found :(</p>
  }
  //If posts array exists (i.e. API has been called)
  else {
		return (
      <ol className="posts-list">
        {showingPosts.map((p) =>
            <li key={p.id}>
              <Link to={'/posts/' + p.id}><h4>{p.title}</h4></Link>
              <span className="post-category">{p.category}</span>
              <span className="post-timestamp">{p.timestamp}</span>
              <p>{p.body}</p>
              <span>Vote Score: {p.voteScore}</span>
              <button className="upVote" onClick={(event)=> votePost(p.id, 'upVote')}>Up Vote</button>
              <button className="downVote" onClick={(event)=> votePost(p.id, 'downVote')}>Down Vote</button>
              <span>There are {p.commentCount} Comment(s)</span>
            </li>
          )}
      </ol>
		)
  }
}



export default PostList