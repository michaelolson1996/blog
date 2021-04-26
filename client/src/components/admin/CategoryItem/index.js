import React, { useState } from 'react';

export default function CategoryItem(props) {

    return (
        <>
            <div style={{ margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={props.src} style={{ height: '200px', width: '200px' }}></img>
                <h3>{props.title}</h3>
            </div>
        </>
    )
}