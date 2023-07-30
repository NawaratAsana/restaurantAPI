const orderFood = require('../model/orderFood')
const { db } = require('../model/orderFood')

module.exports.addorderfood = async (req, res) => {

    try {
        const { quantity, order_id, food_id_id} = req.body

        const OrderFood = await orderFood.create({ quantity, order_id, food_id_id} );
        res.json(OrderFood);
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

