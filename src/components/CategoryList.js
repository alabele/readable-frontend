import React  from 'react'
import {Link} from 'react-router-dom'

function CategoryList(props) {

		const {categories} = props
		return (
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


export default CategoryList