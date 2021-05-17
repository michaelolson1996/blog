import React from 'react';
import './index.css';

export default function DisplayCRUDItems(props) {
    return (
        <div className='display-crud-body'>
            <div className='display-crud-container'>
                { props.children }
            </div>
        </div>
    )
}