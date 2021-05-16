const express = require('express');
const postRouter = express.Router();
const getBucketConn = require('../s3/index');
const AWS = require('aws-sdk');
const s3 = getBucketConn();

postRouter.route("/:category")
    .get((req, res) => {
        console.log(req)

        return res.send({ res })
    })


module.exports = postRouter;