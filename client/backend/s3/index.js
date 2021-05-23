const AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-1'});

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { 
        Bucket: 'michaelolson-blog-bucket' 
    }
});

const getBucketConn = () => {
    return s3;
}

module.exports = getBucketConn;