import React from 'react';

export default function Preview(props) {

    const post = props.post;

    return (
        <div style={{ position: 'absolute', top: '0', left: '0', height: '100vh', width: '100vw', backgroundColor: 'white', overflowX: 'hidden' }}>
            <div style={{ width: '100vw', height: '100px', backgroundColor: 'blue', marginBottom: '40px' }}>
                <div style={{ position: 'absolute', top: '20px', right: '20px', color: 'white' }} onClick={ props.togglePreview }>hello</div>

            </div>
            <div style={{ maxWidth: '1000px', width: '90%', minWidth: '300px', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img alt="" src={ post.headerImage.raw } style={{ width:'100%' }} />
                <div style={{width: '100%'}}>
                    <h1 style={{ textAlign: 'left', fontSize: '2.5rem' }}>{ post.title }</h1>
                    <h2 style={{ textAlign: 'left', fontSize: '2.2rem' }}>{ post.subTitle }</h2>
                </div>
                { post.content.map(item => item.getValue()) }
            </div>
        </div>
    );
}