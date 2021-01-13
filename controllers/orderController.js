const Order = require("../models/orderModel");
const Food = require("../models/foodModel");

const checkInventoryofItems = async (orderItems) => {
    var length = orderItems.length;
    var count = 0;
    for(item of orderItems ){
        const food = await Food.findById(item.foodid);
        if(food.inventory_available < item.quantity){
            return false;
        }
        count++;
        if(length >= count){
            return true;
        }
    }
}

const updateInventory = async (orderItems) => {
    for(item of orderItems ){
        await Food.findByIdAndUpdate(item.foodid, { $inc: { inventory_available: -Math.abs(item.quantity) } });
    }
}

exports.placeOrder = async (req, res, next) => {
    try {
        const user_name = req.body.user_name;
        const orderItems = req.body.orderItems;
        const subtotal = req.body.subtotal;

        if(user_name !== null && orderItems !== null && subtotal !== null){

            //checking for the availability of all food item and requested quanity
            let status = await checkInventoryofItems(orderItems);
            if(!status){
                res.status(401).json({
                    status: "failure",
                    message: "One or more items(quantity) not available, please try again"
                });
                return 0;
            }

            //placing an order
            const newOrder = await Order.create({
                user_name : user_name,
                orderItems : orderItems,
                subtotal : subtotal,
            });

            if(!newOrder){
                res.status(400).json({
                    status: "failure",
                    message: "Error while placing order, please try again later"
                });
                return 0;
            }
            //updaing inventory
            await updateInventory(orderItems);

            res.status(201).json({
                status: "success",
                data: newOrder
            });
            
        } else {
            res.status(400).json({
                status: "failure",
                message: "Invalid request"
            });
        }

        
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: "Error while placing order, please try again later"
        });
    }
}