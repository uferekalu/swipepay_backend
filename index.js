const express = require("express");
const connectDB = require("./lib/db");
const cors = require('cors');
const app = express()
const PORT = 4000
//Connecting the Database
connectDB();

app.use(express.json())
app.use(cors())
const corsOptions = {
    "Access-Control-Allow-Origin": "https://swipepay-backend.vercel.app"
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Swipe pay Checkout process");
});

app.use("/api/auth", require('./routes/userRoutes'))
app.use("/api/checkout", require("./routes/checkoutRoute"))
app.use("/api/orderHistory", require("./routes/orderHistory"))

const server = app.listen(PORT, () =>
    console.log(`Server Connected to port ${PORT}`)
)

// Handling Error
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})