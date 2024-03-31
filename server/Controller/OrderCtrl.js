const Order = require('../Models/OrderModel');

const OrderCtrl = {
    getAllOrders: async (req, res) => {
        try {
            const order = await Order.find();
            res.json(order);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    addOrder: async (req, res) => {
        const { userId, cartItems } = req.body; // Lấy dữ liệu từ req.body
    try {
        const productIds = cartItems.map(item => item._id);
        const newOrder = new Order({
            infor: userId, // Đặt userId vào trường infor
            product: productIds // Đặt cartItems vào trường product
        });
            const saveOrder = await newOrder.save();

            res.json({
                success: true,
                message:'Order created successfully',
                order: saveOrder
            })
        } catch (err) {
            res.status(500).json({msg: err.message})        }
    },

}
module.exports = OrderCtrl;
