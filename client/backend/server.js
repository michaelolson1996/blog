const express = require("express");
const cors = require("cors");
const categoryRouter = require("./routes/categories");
const stripeRouter = require("./routes/stripe");
const emailRouter = require("./routes/email");


const app = express();

app.use(express.urlencoded({limit: '800mb', extended:true}));
app.use(express.json({limit: '800mb', extended: true}));
app.use(cors());
app.options('*',cors());

app.use("/api/categories", categoryRouter);
app.use("/api/payment", stripeRouter);
app.use("/api/email", emailRouter);

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://m.stripe.network https://pay.google.com https://www.google-analytics.com https://js.stripe.com 'unsafe-inline'; style-src https://m.stripe.network 'self' https://js.stripe.com https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://m.stripe.network https://fonts.gstatic.com https://m.stripe.network; base-uri 'self';");
    return next();
});

app.listen(3001, () => {
    console.log("listening on port 3001")
})
