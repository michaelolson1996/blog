import React from 'react';
import { NavLink } from 'react-router-dom';

const Category = props => {
    return (
        <NavLink className="category-wrapper" to={`/categories/${encodeURIComponent(props.category.title)}`}>
            <img className="category-image" src={`data:image/png;base64,${props.category.image}`} />
            <p className="category-title">{props.category.title}</p>
        </NavLink>
    )
}

export default Category;