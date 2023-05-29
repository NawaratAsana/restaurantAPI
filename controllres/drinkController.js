const drink = require('../model/drink')
const {db} = require('../model/drink')

module.exports.addDrink= async (req, res) => {
  
    const NewDrink= new drink({
        drink: req.body.drink,
        photo: req.body.photo,
        price: req.body.price,
        typeDrink_id: req.body.typeDrink_id,
       
    });
    try {
        const saveDrink = await NewDrink.save();
        res.json(saveDrink);
    } catch (err) {
        res.json({ message: err });
    }
}
module.exports.getDrink = async (req, res) => {
   
    try {
        const Drink = await drink.find();
        res.json(drink);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.updateDrink= async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await drink.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports.deleteDrink= async (req, res) => {
    console.log(req.params)
    let data = await drink.deleteOne(req.params);
    res.send(data);
}