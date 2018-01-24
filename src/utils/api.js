const url = "http://localhost:3001/"
const auth = { headers: { 'Authorization': 'howdy-from-atx' } }

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