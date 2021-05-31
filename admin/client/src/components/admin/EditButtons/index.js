import React from 'react';
import './index.css';

export default function EditButtons(props) {
    return (
        <>
            <div id="admin-buttons-backdrop" onClick={ () => { props.toggleDisplayOptions() } }></div>
            <div id='admin-buttons-body'>
                <ul className='admin-button-list'>
                    <li className='admin-button-li'>
                        <button onClick={ () => props.setOperation("new_post") } className='admin-button'>
                            New Post
                        </button>
                    </li>
                    <li className='admin-button-li'>
                        <button onClick={ () => props.setOperation("edit_post") } className='admin-button'>
                            Edit Post
                        </button>
                    </li>
                    <li className='admin-button-li'>
                        <button className='admin-button'>
                            Delete Post
                        </button>
                    </li>
                    <li className='admin-button-li'>
                        <button onClick={ () => props.setOperation("new_category") } className='admin-button'>
                            New Category
                        </button>
                    </li>
                    <li className='admin-button-li'>
                        <button onClick={ () => props.setOperation("edit_category") } className='admin-button'>
                            Edit Category
                        </button>
                    </li>
                    <li className='admin-button-li'>
                        <button className='admin-button'>
                            Delete Category
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}