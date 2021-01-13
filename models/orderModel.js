const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    user_name:{
        type: String,
        required: true
    },
    subtotal: {
        type: Number,
        required: [true, 'total amount is required']
    },
    orderDateTime: {
        type: Date,
        default: Date.now(),
        select: false // this is for always excluding this field from response 
    },
    orderItems: [
        {
            foodid: {
                type: mongoose.Schema.ObjectId,
                ref: 'Food'
            },
            quantity: Number,
            _id : {id:false}
        }
    ]
})
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;