const express = require("express");
const connectDB = require("./lib/db");
const app = express()
const PORT = 4000
//Connecting the Database
connectDB();

app.use(express.json())

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