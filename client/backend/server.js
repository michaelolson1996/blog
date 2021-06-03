const express = require("express");
const cors = require("cors");
const categoryRouter = require("./routes/categories");
const stripeRouter = require("./routes/stripe");


const app = express();

app.use(express.urlencoded({limit: '800mb', extended:true}));
app.use(express.json({limit: '800mb', extended: true}));
app.use(cors());
app.options('*',cors());

app.use("/categories", categoryRouter);
app.use("/payment", stripeRouter);

app.listen(3001, () => {
    console.log("listening on port 3001")
})