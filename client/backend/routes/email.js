const express = require('express');
const emailRouter = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

emailRouter.route("/")
    .all((req, res) => {

      if (req.body.name == '' || req.body.email == '' || req.body.body == '')
        return res.status(200).send({ success: false })

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
        to: process.env.EMAIL,
        subject: req.body.subject,
        text: `\n\nName : ${req.body.name}\n\nEmail : ${req.body.email}\n\nMessage : ${req.body.body}`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err)
          return res.status(200).send({ success: false })
        else
          return res.status(200).send({ success: true })
      })
    })

module.exports = emailRouter;