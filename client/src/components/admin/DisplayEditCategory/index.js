import React, { useState } from 'react';
import CategoryItem from '../CategoryItem';

export default function DisplayEditCategory(props) {
    
    const [state, setState] = useState({ isEditing: false, title: '', image: '' })

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexWrap: 'wrap' }}>

            {
                props.categories.map((category, i) => {
                    return <CategoryItem key={i} src={`data:image/png;base64,${category.image}`} title={category.title} />
                })
            }
        </div>
    )
}