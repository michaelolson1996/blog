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

categoryRouter.route("/posts/:category")
    .all((req, res) => {

        s3.listObjectsV2({ Prefix: `${req.params.category}/` }).promise()
            .then(data => {
                let posts = []

                data.Contents.forEach(content => {
                    let tempKey = content.Key.split("/");
                    if (!tempKey[1].includes(".") && !posts.includes(tempKey[1]) && tempKey[1] !== "")
                        posts.push(tempKey[1])
                })

                return res.status(200).send({ posts })
            })
    })

categoryRouter.route("/:category/:post")
    .all((req, res) => {

        const category = encodeURIComponent(req.params.category);
        const post = encodeURIComponent(req.params.post);
        const key = `${category}/${post}/${post}.js`;

        const params = {
            Bucket: "michaelolson-blog-bucket",
            Key: key
        }

        s3.getObject(params).promise()
            .then(data => {
                return res.status(200).send(data.Body.toString())
            })
    })

module.exports = categoryRouter;