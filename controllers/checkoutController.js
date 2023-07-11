const express = require("express")
const Order = require("../models/order")
const app = express()
const stripe = require('stripe')(process.env.stripeSecretKey)
const jwt = require('jsonwebtoken')
const User = require("../models/user")

const checkout = async (req, res) => {
    const { order, paymentMethodId } = req.body

    try {
        // Verify the JWT token
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.jwtSecret)
        const userId = decodedToken.userId;

        // Retrieve the user 
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        // Create a Stripe PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 50,
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true
        })

        // Store the confirmed paid order in the database
        const newOrder = new Order({
            order: order,
            paymentId: paymentIntent.id,
            user: userId

        })
        await newOrder.save()

        // Update the user's order history
        user.orderHistory.push(newOrder)
        await user.save()

        res.status(200).json({
            message: 'Payment successful',
            newOrder
        })
    } catch (error) {
        res.status(400).json({
            message: 'Payment failed',
            error: error.message
        })
    }
}

module.exports = {
    checkout
}