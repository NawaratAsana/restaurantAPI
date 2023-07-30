const drink = require('../model/drink');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'df8clipqz',
  api_key: '194894554869875',
  api_secret: 'onF0NwqgKYrmHOh6orIHCPspr3Y'
});


module.exports.addDrink = async (req, res) => {
  try {
    const { name, image, price, typeDrink_id } = req.body

    if (!(name && image && price && typeDrink_id)) {
      res.status(400).send('All input is required');
    }
    console.log("body", req.body)

    const base64Image = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '',);

    // Upload base64 image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`,{
      resource_type: "auto",
      folder: 'drink'
    });

    const Drink = await drink.create({
      name,
      image: uploadedImage.secure_url, 
      public_id: uploadedImage.public_id ,
      price,
      typeDrink_id,
    });

    res.status(201).json(Drink)
  }
  catch (err) {
    res.json({ message: err });
  }
}


module.exports.getDrink = async (req, res) => {
  try {
    const Drink = await drink.find();
    res.json(Drink);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports.updateDrink = async (req, res) => {
  try {
    const id = req.params.id;
     const { name, image, price, typeDrink_id } = req.body;

    if (!(name && price && typeDrink_id)) {
      return res.status(400).send('All input is required');
    }

  
    let updatedData = {
      name,
      price,
      typeDrink_id
    };

    if (image) {
      const base64Image = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

      // Upload base64 image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
        resource_type: 'auto',
        folder: 'drink'
      });

      updatedData.image = uploadedImage.secure_url;
      updatedData.public_id = uploadedImage.public_id;
    } else {
      // Check if image should be removed
      if (req.body.removeImage === 'true') {
        // Remove image from Cloudinary
        if (req.body.public_id) {
          await cloudinary.uploader.destroy(req.body.public_id);
        }

        updatedData.image = undefined;
        updatedData.public_id = undefined;
      }
    }
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
module.exports.deleteDrink = async (req, res) => {
  console.log(req.params)
  let data = await drink.deleteOne(req.params);
  res.send(data);
}


module.exports.getDrinkId = async (req, res) => {
  try {
    const Drink = await drink.find({ _id: req.params.id });
    res.json(Drink)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}
