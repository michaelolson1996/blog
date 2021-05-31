import React from 'react';
import parse from 'html-react-parser';
import "./index.css";

export default function Preview(props) {
    const post = props.post;
    const d = new Date();
    
    return (
        <div id="preview-wrapper">
            <div id="post-wrapper">
                <div id="header-information">
                    <h2 id="post-title">{post.title}</h2>
                    <h3 id="post-subtitle">{post.subTitle}</h3>
                    <p id='post-date'>{d.getMonth()}/{d.getDay() + 1}/{d.getFullYear()}</p>
                </div>
                <img id="post-header-image" src={post.headerImage.raw} />
                { post.content.map(item => parse(item.value)) }
            </div>
        </div>
    );
};