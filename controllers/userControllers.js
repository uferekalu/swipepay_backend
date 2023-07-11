/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// User registeration
const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        // check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save()

        res.status(200).json({
            message: "User registered successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Registration failed",
            error: error.message
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // Check if the user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or passowrd"
            })
        }

        // check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        // Generate a JWT Token
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.jwtSecret,
            {
                expiresIn: 3 * 60 * 60, // 3hrs in sec
            }
        )

        res.status(200).json({
            message: 'Login successful',
            token
        })
    } catch (error) {
        res.status(400).json({
            message: 'Login failed',
            error: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}