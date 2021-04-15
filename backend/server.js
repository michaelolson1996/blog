const express = require("express");
const app = express();

// const AWS = require('aws-sdk');

// AWS.config.update({region: 'us-west-2'});

// s3 = new AWS.S3({apiVersion: '2006-03-01'});

// s3.getObject({ Bucket: 'michaelolson-blog-bucket', Key: '/' },
//     (err, data) => {
//         if (err) console.log(err)
//         else if (data) console.log(data)
//     })

app.listen(5000, () => {
    console.log("michaelolson.blog (server):5000 [listening]");
});
