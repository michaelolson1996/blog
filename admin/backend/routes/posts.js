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
        const postHtmlKey = `${category}/${file_name}/${file_name}.html`;
        const postCssKey = `${category}/${file_name}/${file_name}.css`;

        const jsonPostData = JSON.stringify(post);

        const jsonParams = {
            Bucket: "michaelolson-blog-bucket",
            Key: postJsonKey,
            Body: jsonPostData
        }

        s3.upload(jsonParams, (err, data) => {
            if (err)
                console.log(err)
        })

        let htmlBody = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>${post.title}</title>
            </head>
            <body>
                <nav>
                    <ul>
                        <li><a></a></li>
                        <li><a></a></li>
                        <li><a></a></li>
                    </ul>
                </nav>
                <div class="">
                    ${post.content}
                </div>
            </body>
        </html>
        `
        const htmlParams = {
            Bucket: "michaelolson-blog-bucket",
            Key: postHtmlKey,
            Body: htmlBody
        }

        s3.upload(htmlParams, (err, data) => {
            if (err)
                console.log(err)
        })

        let cssStyle = `
            body {
                height: auto;
                width: 100%;
            }

            nav {
                width: 100%;
                height: 100px;
                background-color: blue;
                margin-bottom: 40px;
            }
        `

        const cssParams = {
            Bucket: "michaelolson-blog-bucket",
            Key: postCssKey,
            Body: cssStyle
        }
        
        s3.upload(cssParams, (err, data) => {
            if (err)
                console.log(err)
        })
        
        return res.status(200).send({ posts: [] })
    })

module.exports = postRouter;