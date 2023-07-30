const orderDrink = require('../model/orderFood')
const { db } = require('../model/orderFood')

module.exports.addorderdrink = async (req, res) => {
  
    try {
        const { quantity, order_id, drink_id} = req.body

        const OrderDrink = await orderDrink.create({ quantity, order_id, drink_id} );
        res.json(OrderDrink);
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

