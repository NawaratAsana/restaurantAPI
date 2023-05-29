const orderDrink = require('../model/orderFood')
const { db } = require('../model/orderFood')

module.exports.addorderdrink = async (req, res) => {
    const NewOrderDrink= new orderDrink({
        quantity: req.body.quantity,
        orderdate: req.body.orderdate,
        order_id: req.body.order_id,

       
    });
    try {
        const saveOrderDrink = await NewOrderDrink.save();
        res.json(saveOrderDrink);
    } catch (err) {
        res.json({ message: err });
    }
}
module.exports.getOrderDrink = async (req, res) => {
    try {
        const OrderDrink = await orderdrink.find();
        res.json(OrderDrink);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

