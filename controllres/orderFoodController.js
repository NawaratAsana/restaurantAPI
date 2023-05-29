const orderFood = require('../model/orderFood')
const { db } = require('../model/orderFood')

module.exports.addorderfood = async (req, res) => {
    const NewOrderFood = new orderFood({
        quantity: req.body.quantity,
        orderdate: req.body.orderdate,
        order_id: req.body.order_id,

       
    });
    try {
        const saveOrderFood = await NewOrderFood.save();
        res.json(saveOrderFood);
    } catch (err) {
        res.json({ message: err });
    }
}
module.exports.getOrderFood = async (req, res) => {
    try {
        const OrderFood = await orderfood.find();
        res.json(OrderFood);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

