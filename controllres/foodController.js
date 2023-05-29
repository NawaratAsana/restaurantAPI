
const food = require('../model/food')



// module.exports.addFood = async (req, res) => {

//     try {
//         const {
//             name, 
//             image, 
//             price, 
//             typeFood_id,

//         } = req.body;
//         if (!(name && image && price && typeFood_id)) {
//             res.status(400).send("All input is required");
//         }

//         const bufferImage = Buffer.from(image,'base64');
//         const foodMenu = await food.create({
//             name,
//             image: bufferImage,
//             price,
//             typeFood_id
//         })
//         res.status(201).json(foodMenu)
//     }
//     catch (err) {
//         res.json({ message: err });
//     }

// }

////chatGPT
// module.exports.addFood = async (req, res) => {
//     try {
//       const { name, price, typeFood_id } = req.body;
  
//       if (!(name && price && typeFood_id)) {
//         return res.status(400).send("All input is required");
//       }
  
//       // Use multer middleware to upload the image
//       upload.single('image')(req, res, async (err) => {
//         if (err) {
//           return res.status(500).json({ message: "Image upload failed" });
//         }
  
//         // Retrieve the uploaded image file path
//         const imagePath = req.file.path;
  
//         try {
//           const foodMenu = await food.create({
//             name,
//             image: imagePath,
//             price,
//             typeFood_id
//           });
//           res.status(201).json(foodMenu);
//         } catch (error) {
//           res.status(500).json({ message: "Failed to create food item" });
//         }
//       });
//     } catch (error) {
//       res.status(500).json({ message: "Failed to add food item" });
//     }
//   };
////////////////////////////////////////////////////////////////////
module.exports.addFood = async (req, res) => {


//////////////////////////
// try {
//     const {
//         name, 
//         image, 
//         price, 
//         typeFood_id,

//     } = req.body;
//     if (!(name && image && price && typeFood_id)) {
//         res.status(400).send("All input is required");
//     }

//     const bufferImage = Buffer.from(image,'base64');
//     const foodMenu = await food.create({
//         name,
//         image: bufferImage,
//         price,
//         typeFood_id
//     })
//     res.status(201).json(foodMenu)
// }
//  catch (error) {
//           res.status(500).json({ message: "Failed to add food item" });
//         }
/////////////////////////////////////////
try {
    const { name, image, price, typeFood_id } = req.body;

    if (!(name && image && price && typeFood_id)) {
      res.status(400).send('All input is required');
    }

    const imageBuffer = Buffer.from(image,'base64'); // Convert base64 string to Buffer

    const foodMenu = await food.create({
      name,
      // image: {
      //   data: imageBuffer,
      //   contentType: 'image/jpeg', // Set the appropriate content type for your image
      // },
      image:imageBuffer,
      price,
      typeFood_id,
    });

    res.status(201).json(foodMenu);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

//////////////////////////////





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
      const Food = await food.find({_id:req.params.id});
      res.json(Food)
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
}

 // Assuming you have the Food model defined in a separate file
 module.exports.getImage = async (req, res) => {
  try {
    const foodId = req.params.id; // Assuming you have the food ID in the request parameters

    // Retrieve the food document from the database
    const Food = await food.findById(foodId);

    if (!Food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    // Check if the food document has an image
    if (!Food.image || !Food.image.data || !Food.image.contentType) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Set the appropriate content type for the image
    res.contentType(Food.image.contentType);

    // Send the image data as the response
    res.send(Food.image.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

