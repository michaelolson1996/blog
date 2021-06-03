const express = require('express');
const stripeRouter = express.Router();
require('dotenv').config();
const stripe = require('stripe')(`${process.env.STRIPE_TEST_KEY_SK}`);

stripeRouter.route("/")
    .post( async (req, res) => {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: 'T-shirt',
                    },
                    unit_amount: 2000,
                  },
                  quantity: 1,
                },
              ],
            mode: 'payment',
            success_url: 'http://localhost:3000',
            cancel_url: 'http://localhost:3000',
        })

        return res.status(200).send({ id: session.id });
    })

module.exports = stripeRouter;