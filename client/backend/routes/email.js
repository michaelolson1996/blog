const express = require('express');
const emailRouter = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

emailRouter.route("/")
    .all((req, res) => {

      console.log(req.body)

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL_TO,
        subject: req.body.subject,
        text: `Name : ${req.body.name}\nEmail : ${req.body.email}\nMessage : ${req.body.body}`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err)
          return res.status(200).send({ error: true })
        else
          return res.status(200).send({ error: false })
      })
    })

module.exports = emailRouter;