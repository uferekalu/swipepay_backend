const Mongoose = require("mongoose")

const userSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    orderHistory: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const User = Mongoose.model('User', userSchema);

module.exports = User;