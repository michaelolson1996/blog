const AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

// s3.getBucketWebsite({ Bucket: 'michaelolson-blog-bucket' },
//     (err, data) => {
//         if (err) console.log(err)
//         else if (data) console.log(data)
//     })


