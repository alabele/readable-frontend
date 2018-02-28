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
    console.log('itemB', itemB)
    let comparison = 0;
    if (itemA > itemB) {
      comparison = 1;
    } else if (itemA < itemB) {
      comparison = -1;
    }
    return comparison;
    }
}


function PostList({posts,orderBy}) {
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
        {showingPosts.map((post) =>
            <li key={post.id}>
              <span className="post-category">{post.category}</span>
              <Link to={'/posts/' + post.id}><h4>{post.title}</h4></Link>
              <span className="post-timestamp">{post.timestamp}</span>
              <p>{post.body}</p>
              <span>Vote Score: {post.voteScore}</span>
              <span>There are {post.commentCount} Comment(s)</span>
              {console.log("Timestamp", post.timestamp)}
            </li>
          )}
      </ol>
		)
  }
}



export default PostList