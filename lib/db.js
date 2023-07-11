require('dotenv').config()

const mongoose = require("mongoose")
const localDB = process.env.MONGODB_URI
const connectDB = async () => {
    await mongoose.connect(localDB, {
        dbName: 'swipePay',
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("MongoDB Connected")
}

module.exports = connectDB