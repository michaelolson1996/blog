const express = require("express");
const cors = require("cors");
const routers = require('./routes/index');
const app = express();
const path = require("path");

app.use(express.urlencoded({limit: '800mb', extended:true}));
app.use(express.json({limit: '800mb', extended: true}));
app.use(cors());

app.use("/admin/category", routers.categoryRouter);
app.use("/admin/post", routers.postRouter);

app.listen(8000, () => {
    console.log('listening on port 8000');
});