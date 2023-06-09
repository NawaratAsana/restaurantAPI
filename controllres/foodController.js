
const food = require('../model/food')

module.exports.addFood = async (req, res) => {

  try {
    const { name, image, price, typeFood_id } = req.body;

    if (!(name && image && price && typeFood_id)) {
      res.status(400).send('All input is required');
    }

    const foodMenu = await food.create({
      name,
      image,
      price,
      typeFood_id,
    });

    res.status(201).json(foodMenu)
  }
  catch (err) {
    res.json({ message: err });
  }

}

module.exports.getFood = async (req, res) => {
  try {
    const Food = await food.find();
    res.json(Food);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports.updateFood = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await food.findByIdAndUpdate(
      id, updatedData, options
    )
    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports.deleteFood = async (req, res) => {
  console.log(req.params)
  let data = await food.deleteOne(req.params);
  res.send(data);
}


module.exports.getFoodId = async (req, res) => {
  try {
    const Food = await food.find({ _id: req.params.id });
    res.json(Food)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}
