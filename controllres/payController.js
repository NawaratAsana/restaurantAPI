const pay = require('../model/pay')
const { db } = require('../model/pay')


module.exports.getPay = async (req, res) => {
    try {
        const Pay = await pay.find();
        res.json(Pay);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

