import React, { useState } from 'react';
import CategoryItem from '../CategoryItem';

export default function DisplayEditCategory(props) {
    
    const [state, setState] = useState({ isEditing: false, title: '', image: '' });

    const editCategory = (title, image) => {
        setState({
            isEditing: true,
            title: title,
            image: image
        })
    }

    const displayCategories = () => {
        setState({
            isEditing: false,
            title: '',
            image: ''
        })
    }

    return (
        <>
            {
                state.isEditing ?
                    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <button onClick={ displayCategories }>hello</button>
                    </div>
                :
                    <div style={{ height: '100%', width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                        {
                            props.categories.map((category, i) => {
                                return <CategoryItem editCategory={ editCategory } key={i} src={`data:image/png;base64,${category.image}`} title={category.title} />
                            })
                        }
                    </div>
            }
        </>
    )
}


