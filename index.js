const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

require('dotenv').config()


app.use(express.json())
// app.use(express.static('public'))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    [1, { price: 10000, name: 'react' }],
    [2, {price:20000, name:'css'}]
])

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log('post try')
    console.log(req.body)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items:

        req.body.items.map(item => {
        // const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: 'hkd',
            product_data: {
              name: item.name
            },
            unit_amount:item.price * 100 // 每分計算，所以要*100
          },
          quantity: item.quantity
        }
      }),
      success_url:`${process.env.SERVER_URL}/success.html`,
      cancel_url:`${process.env.SERVER_URL}/cancel.html`
    })
    res.json({ url: session.url})
  } catch (e){
    res.status(500).json({error: e})
  }
})

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
