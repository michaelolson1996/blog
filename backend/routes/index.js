const express = require('express');
const bucketRouter = express.Router();
const AWS = require('aws-sdk');

bucketRouter.route("/")
    .post((req, res) => {

        

    })

module.exports = bucketRouter;
