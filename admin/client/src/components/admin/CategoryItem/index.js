import React from 'react';

export default function CategoryItem(props) {

    return (
        <>
            <div onClick={ props.type === "edit_category" ? 
                () => props.editCategory(props.title, props.src) 
            :
                () => props.retrievePosts(props.title)
        } 
                 style={{ margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} >
                <img alt={ props.title } src={props.src} style={{ height: '200px', width: '200px' }}></img>
                <h3>{props.title}</h3>
            </div>
        </>
    )
}