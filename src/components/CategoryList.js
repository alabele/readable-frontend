import React  from 'react'
import {Link} from 'react-router-dom'

function CategoryList({posts, categories, orderBy}) {
   // const cat = categories.list
    //console.log("Category List Props", categories)
  if (categories === undefined) {
    return <p>No categories found :(</p>
  }
else {
		return (
      //<div>Hello World</div>
     <ul className="categories-list">
        <Link
            to="/" key="all">
            <li>
              All
            </li>
          </Link>
       {categories.map((category) =>
          <Link
            to={category.path} key={category.name}>
            <li>
              {category.name}
            </li>
          </Link>
          )}
      </ul>
		)
  }
}


export default CategoryList