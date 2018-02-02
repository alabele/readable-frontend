export const url = "http://localhost:3001/"
export const auth = { headers: { 'Authorization': 'howdy-from-atx' } }


export const fetchCategories = () =>
  fetch(url + "categories", auth )
  .then((res) => {
	return res.json()
	})
.then((categories) => {
   console.log(categories.categories);
   return categories.categories
});

export const fetchPosts = () =>
  fetch(url + "posts", auth)
  .then((res) => {
	return res.json()
	})
.then((posts) => {
   console.log('posts', posts);
   return posts
});

// export const fetchMyCategory = (category) =>
//   fetch(url + category + "posts", auth )
//   .then((res) => {
//   return res.json()
//   })
// .then((categories) => {
//    console.log(categories.categories);
//    return categories.categories
// });

export const fetchSinglePost = (id) =>
  fetch(url + "posts/" + id, auth)
  .then((res) => {
  return res.json()
  })
.then((post) => {
   console.log('single post', post);
   return post
});