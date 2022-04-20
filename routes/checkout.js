require('dotenv').config()
const express = require("express");
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

router.post('/', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items:
        req.body.items.map(item => {
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
      success_url:`${process.env.DEV_SERVER_URL}/success`,
      cancel_url:`${process.env.DEV_SERVER_URL}/cancel`
    })
    res.json({ url: session.url})
  } catch (e){
    res.status(500).json({error: e, env:process.env.NODE_ENV})
  }
})

module.exports = router;
