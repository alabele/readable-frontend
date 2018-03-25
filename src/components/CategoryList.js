import React  from 'react'
import {Link} from 'react-router-dom'

function CategoryList({posts, categories, orderBy, myFunc}) {
  if (categories === undefined) {
    return <p>No categories found :(</p>
  }
else {
		return (
      <div>
        <h3>TOPICS</h3>
         <ul className="categories-list">
            <Link
                to="/" key="all">
                <li>
                  All
                </li>
              </Link>
           {categories.map((category) =>
              <Link
                to={'/category/' + category.path} key={category.name}>
                 <li onClick={(event)=> myFunc(category.name)}>
                  {category.name}
                </li>
              </Link>
              )}
          </ul>
        </div>
		);
  }
}


export default CategoryList