import React from 'react';

const Category = props => {
    return (
        <div className="category-wrapper">
            <img className="category-image" src={`data:image/png;base64,${props.category.image}`} />
            <p className="category-title">{props.category.title}</p>
        </div>
    )
}

export default Category;