const express = require("express");
const cors = require("cors");
const categoryRouter = require('./routes/index');
const app = express();
const path = require("path");



app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.use("/admin/category", categoryRouter);

app.listen(8000, '127.0.0.1');
