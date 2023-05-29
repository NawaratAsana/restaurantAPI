const order = require('../model/order')
const { db } = require('../model/order')

module.exports.addorder = async (req, res) => {
    const NewOrder = new order({
        quantity: req.body.quantity,
        orderdate: req.body.orderdate,
        order_id: req.body.order_id,
        member_id: req.body.member_id,
        employee_id: req.body.employee_id,
       
    });
    try {
        const saveOrder = await NewOrder.save();
        res.json(saveOrder);
    } catch (err) {
        res.json({ message: err });
    }
}
module.exports.getOrder = async (req, res) => {
    try {
        const Order = await order.find();
        res.json(Order);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

