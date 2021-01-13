const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, 'A Food must have a name']
    },
    inventory_available: {
        type: Number,
        required: [true, 'Quantity field cannot be null']
    },
    cost: {
        type: Number,
        required: [true, 'Quantity field cannot be null']
    },
    cuisine: { 
        type: String,
        required: [true, 'cuisine is required']
    },
    food_type: String
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;