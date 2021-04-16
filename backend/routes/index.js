const express = require('express');
const categoryRouter = express.Router();
// const AWS = require('aws-sdk');

categoryRouter.route("/")
    .post((req, res) => {
        console.log("hello");
        // console.log(req);
        return res.status(200).send("hello");
    })

module.exports = categoryRouter;
