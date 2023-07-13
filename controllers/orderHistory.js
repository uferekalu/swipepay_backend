const jwt = require("jsonwebtoken")
const User = require("../models/user")

const orderHistory = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.jwtSecret)
        const userId = decodedToken.userId

        // retrieve the user order history and populate the order details
        const user = await User.findById(userId).populate("orderHistory")
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            orderHistory: user.orderHistory
        })
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving order history",
            error: error.message
        })
    }
}

module.exports = {
    orderHistory
}