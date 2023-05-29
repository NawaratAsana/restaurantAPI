const typeDrink = require('../model/typeDrink')

module.exports.getTypeDrink = async (req, res) => {
    try {
        const TypeDrink = await typeDrink.find();
        res.json(TypeDrink);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}