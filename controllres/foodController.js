const food = require('../model/food');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'df8clipqz',
  api_key: '194894554869875',
  api_secret: 'onF0NwqgKYrmHOh6orIHCPspr3Y'
});


module.exports.addFood = async (req, res) => {
  try {
    const { name, image, price, typeFood_id } = req.body

    if (!(name && image && price && typeFood_id)) {
      res.status(400).send('All input is required');
    }
    

    const base64Image = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '',);

    // Upload base64 image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`,{
      resource_type: "auto",
      folder: 'food'
    });

    const Food = await food.create({
      name,
      image: uploadedImage.secure_url, 
      public_id: uploadedImage.public_id ,
      price,
      typeFood_id,
    });

    res.status(201).json(Food)
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
    const { name, image, price, typeFood_id } = req.body;

    if (!(name && price && typeFood_id)) {
      return res.status(400).send('All input is required');
    }

    let updatedData = {
      name,
      price,
      typeFood_id
    };

    if (image) {
      
      if (image !== req.body.image) {
        if (req.body.public_id) {
          await cloudinary.uploader.destroy(req.body.public_id);
        }
        const base64Image = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

        const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
          resource_type: 'auto',
          folder: 'food'
        });

        updatedData.image = uploadedImage.secure_url;
        updatedData.public_id = uploadedImage.public_id;
      }
    }

    const options = { new: true };
    const result = await food.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
