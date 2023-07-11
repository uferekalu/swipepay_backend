const express = require('express')
const { checkout } = require('../controllers/checkoutController')
const router = express.Router()

router.route("/").post(checkout)

module.exports = router