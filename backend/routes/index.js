const express = require('express');
const categoryRouter = express.Router();
const getBucketConn = require('../s3/index');
const AWS = require('aws-sdk');
const s3 = getBucketConn();

categoryRouter.route("/new")
    .post((req, res) => {

        let title = req.body.title;
        let file = req.body.raw;
        let file_name = req.body.image_name;


        let categoryKey = encodeURIComponent(title) + "/";

        s3.headObject({ Key: categoryKey }, (err, data) => {
            if (!err) 
                return res.status(200).send({ success: false, message: "Category already exists" })
            if (err.code !== "NotFound")
                return res.status(200).send({ success: false, message: `Error Creating Category : ${err.message}` })

            s3.putObject({ Key: categoryKey }, () => {
                if (err)
                    return res.status(200).send({ success: false, message: `Error Creating Category : ${err.message}` });
            })
        })

        const categoryPhotoKey = (categoryKey + file_name);

        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: "michaelolson-blog-bucket",
                ContentType: 'image/jpeg',
                Key: categoryPhotoKey,
                Body: Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64')
            }
        });

        const promise = upload.promise();

        promise.then(
            function (data) {
                return res.status(200).send({ success: true, message: "success" })
            },
            function (err) {
                return res.status(200).send({ success: false, message: err.message })
            }
        );
    });

module.exports = categoryRouter;
