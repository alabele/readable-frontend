import React  from 'react'

function PostList({posts,orderBy}) {
  console.log("Post List Props", posts)
		if (posts === undefined) {
      return <p>No posts found :(</p>
    }
  else {
		return (
      <ol className="posts-list">
        {posts.map((post) =>
            <li key={post.id}>
              <span className="post-category">{post.category}</span>
              <h4>{post.title}</h4>
              <span className="post-timestamp">{Date(post.timestamp).toString("MM dd")}</span>
              <p>{post.body}</p>
              <span>Vote Score: {post.voteScore}</span>
              <span>There are {post.commentCount} Comment(s)</span>
              {console.log(post.timestamp)}
            </li>
          )}
      </ol>
		)
  }
}


export default PostList