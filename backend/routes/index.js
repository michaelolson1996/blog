const express = require('express');
const categoryRouter = express.Router();

categoryRouter.route("/new")
    .post((req, res) => {
        console.log(req.body);
        return res.status(200).send("hello");
    })

module.exports = categoryRouter;
