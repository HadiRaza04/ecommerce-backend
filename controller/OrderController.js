const Order = require('../models/OrderModel')

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}
module.exports = {getAllOrders}
