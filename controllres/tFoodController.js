const typeFood = require('../model/typeFood')

module.exports.getTypeFood = async (req, res) => {
    try {
        const TypeFood= await typeFood.find();
        res.json(TypeFood);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}