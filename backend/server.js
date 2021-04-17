const express = require("express");
const cors = require("cors");
const categoryRouter = require('./routes/index');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.use("/admin/category", categoryRouter);

app.listen(5000, () => {
    console.log("michaelolson.blog (server):5000 [listening]");
});
