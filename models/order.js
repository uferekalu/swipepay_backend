const Mongoose = require("mongoose")

const orderSchema = new Mongoose.Schema({
    order: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Order = Mongoose.model('Order', orderSchema);

module.exports = Order;