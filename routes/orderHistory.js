// eslint-disable-next-line linebreak-style
const express = require('express')
const { orderHistory } = require('../controllers/orderHistory')

const router = express.Router()

router.route('/').get(orderHistory)

module.exports = router