const express = require('express');
const categoryRouter = express.Router();
const getBucketConn = require('../s3/index');
const AWS = require('aws-sdk');
const s3 = getBucketConn();


const hello = async (params, title, categories, i, count, res) => {
    const result = await s3.getObject(params).promise();

    // console.log(result.Body.toString('base64'))

    categories.push({
        title,
        body: result.Body.toString('base64')
    })

    // console.log(categories)
}

categoryRouter.route("/")
    .get((req, res) => {
        s3.listObjectsV2({ Delimiter: "/" }).promise()
        .then((data, err) => {
            if (err)
                return res.send({ success: false, message: err.message })

            return data.CommonPrefixes
        })
        .then((data, err) => {

            const functionW = item => {
                return item
            }

            let myMap = async () => { 
                return Promise.all(data.map(prefix => { 
                    return functionW(s3.listObjectsV2({ Prefix: prefix.Prefix }).promise()) 
                })
            )}

            myMap().then(data => {
                let myNewMap = async () => {
                    return Promise.all(data.map(object => {
                        let title = object.Prefix.substring(0, object.Prefix.length - 1);
                        let params = {
                            Bucket: "michaelolson-blog-bucket",
                            Key: object.Contents.find(object => object.Key.includes("category_image")).Key
                        }

                        return functionW(
                            s3.getObject(params).promise().then(data => {
                                return { data, title }
                            })
                        )
                    }))
                }

                myNewMap().then(data => {
                    res.send({ data })
                })
            })
        })
    })

categoryRouter.route("/new")
    .post((req, res) => {

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
