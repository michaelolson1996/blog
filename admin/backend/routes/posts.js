const express = require('express');
const postRouter = express.Router();
const getBucketConn = require('../s3/index');
const AWS = require('aws-sdk');
const s3 = getBucketConn();

postRouter.route("/:category")
    .post((req, res) => {
        let post = req.body;
        const category = encodeURIComponent(post.chosenCategory);
        const file_name = encodeURIComponent(post.title);

        const postJsonKey = `${category}/${file_name}/${file_name}.json`;
        const postJsxKey = `${category}/${file_name}/${file_name}.js`;

        const jsonPostData = JSON.stringify(post);

        const jsonParams = {
            Bucket: "michaelolson-blog-bucket",
            Key: postJsonKey,
            Body: jsonPostData
        };

        s3.upload(jsonParams, (err, data) => {
            if (err)
                console.log(err)
        });

        let jsxStr = "";

        post.content.map(element => jsxStr += element.value);

        const d = new Date();

        let jsxBody = `
                    <div id="post-wrapper">
                        <div id="header-information">
                            <h2 id="post-title">${post.title}</h2>
                            <h3 id="post-subtitle">${post.subTitle}</h3>
                            <p id="post-date">Created : ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}</p>
                        </div>
                        <img id="post-header-image" src=${post.headerImage.raw} />
                        ${ jsxStr }
                    </div>`;

        const htmlParams = {
            Bucket: "michaelolson-blog-bucket",
            Key: postJsxKey,
            Body: jsxBody
        };

        s3.upload(htmlParams, (err, data) => {
            if (err)
                console.log(err)
        });
        
        return res.status(200).send({ posts: [] });
    })

module.exports = postRouter;