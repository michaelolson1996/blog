import React from 'react';

export default function Preview(props) {

    const post = props.post;

    return (
        <div style={{ position: 'absolute', top: '0', left: '0', height: '100vh', width: '100vw', backgroundColor: 'white', overflowX: 'hidden' }}>
            <div style={{ width: '100vw', height: '100px', backgroundColor: 'blue', marginBottom: '40px' }}>

            </div>
            <div style={{ maxWidth: '1000px', width: '90%', minWidth: '300px', margin: 'auto' }}>
                <img alt="header-img" src={ post.headerImage.raw } style={{ width:'100%' }} />
                <div>
                    <h1>{ post.title }</h1>
                    <h2>{ post.subTitle }</h2>
                </div>
                { post.content.map(item => item.getValue()) }
            </div>
            <div onClick={ props.togglePreview }>hello</div>
        </div>
    );
}