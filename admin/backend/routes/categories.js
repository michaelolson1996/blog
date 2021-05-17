const express = require('express');
const categoryRouter = express.Router();
const getBucketConn = require('../s3/index');
const AWS = require('aws-sdk');
const s3 = getBucketConn();

categoryRouter.route("/")
    .all((req, res) => {
        s3.listObjectsV2({ Delimiter: "/" }).promise()
        .then((data, err) => {
            if (err)
                return res.send({ success: false, message: err.message })

            return data.CommonPrefixes
        })
        .then((data, err) => {
            if (err)
                return res.send({ success: false, message: err.message })

            const returnPromise = promiseObject => {
                return promiseObject
            }

            const listCategories = async () => { 
                return Promise.all(data.map(prefix => { 
                    return returnPromise(s3.listObjectsV2({ Prefix: prefix.Prefix }).promise()) 
                })
            )}

            listCategories().then(data => {
                const getCategoryData = async () => {
                    return Promise.all(data.map(object => {
                        let title = decodeURIComponent(object.Prefix.substring(0, object.Prefix.length - 1));
                        let params = {
                            Bucket: "michaelolson-blog-bucket",
                            Key: object.Contents.find(object => object.Key.includes("category_image")).Key
                        }

                        return returnPromise(
                            s3.getObject(params).promise().then(data => {
                                return { data, title }
                            })
                        )
                    }))                    
                }

                getCategoryData().then(data => {
                    const categories = data.map(category => {
                        return { image: category.data.Body.toString('base64'), title: category.title }
                    })

                    res.send({categories})
                })
            })
        })
    })

categoryRouter.route("/edit")
    .all((req, res) => {

        if (req.body.title === req.body.newTitle && req.body.image === req.body.newImage)
            return res.send({ success: false, message: 'titles and images are the same' })

        if (req.body.title !== req.body.newTitle) {

            async function emptyS3Directory() {
                const params = {
                    Bucket: 'michaelolson-blog-bucket',
                    Prefix: `${ req.body.title }`
                }
    
                const listedObjects = await s3.listObjectsV2(params).promise();
                const old_keys = []

                listedObjects.Contents.forEach(item => {
                    old_keys.push(item.Key)
                })
    
                new_keys = old_keys.map(key => {
                    split_key = key.split("/");
                    split_key.splice(0, 1, req.body.newTitle);
                    return split_key.join("/");
                })
            }

            emptyS3Directory();

        }

        return res.send({ success: true, message: 'moved category to new title' })
    })

categoryRouter.route("/new")
    .all((req, res) => {

        let title = req.body.title;
        let file = req.body.raw;
        let file_name = req.body.image_name;

        let categoryKey = encodeURIComponent(title) + "/";

        s3.headObject({ Key: categoryKey }, (err, data) => {
            if (!err)
                return res.send({ success: false, message: "Category already exists" });
            if (err.code !== "NotFound")
                return res.send({ success: false, message: `Error Creating Category : ${err.message}` });

            s3.putObject({ Key: categoryKey }, (err, data) => {
                if (err)
                    return res.send({ success: false, message: `Error Creating Category : ${err.message}` });
            })
        })

        const new_file = file_name.split(".");
        new_file.splice(0, 1, 'category_image');

        const categoryPhotoKey = (categoryKey + new_file.join("."));

        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: "michaelolson-blog-bucket",
                Key: categoryPhotoKey,
                Body: Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64')
            }
        });

        const promise = upload.promise();

        promise.then(
            function (data) {
                return res.send({ success: true, message: "success" })
            },
            function (err) {
                return res.send({ success: false, message: err.message })
            }
        );
    })

module.exports = categoryRouter;