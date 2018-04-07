import React  from 'react'
import {Link} from 'react-router-dom'

// When select value is changed, update selected value



function CategoryList({posts, categories, orderBy, path, myFunc}) {

function handleChange(category){
  myFunc(category);
}

  if (categories === undefined) {
    return <p>No categories found :(</p>
  }
else {
		return (
      <div>
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
                 <li onClick={(event)=> handleChange(category.path)}>
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