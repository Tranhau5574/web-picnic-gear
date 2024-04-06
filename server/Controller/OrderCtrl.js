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
                message: 'Order created successfully',
                order: saveOrder
            })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    viewOrderByUserId: async (req, res) => {
    try {
        const userId = req.params.userId; // Get the user ID from the request parameters
        const user = await User.findById(userId); // Find the user by their ID
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const orders = await Order.find({ infor: userId }); // Find all orders associated with the user
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
},
    updateOrderStatus: async (req, res) => {
        const { orderId, newStatus } = req.body; // Lấy id của đơn hàng và trạng thái mới từ req.body
        try {
            // Tìm đơn hàng cần cập nhật
            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ msg: "Order not found" });
            }

            // Cập nhật trạng thái mới
            order.status = newStatus;
            await order.save();

            res.json({
                success: true,
                message: "Order status updated successfully",
                order: order
            });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }



   

}
module.exports = OrderCtrl;
