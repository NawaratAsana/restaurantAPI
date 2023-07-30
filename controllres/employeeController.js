const Employee = require('../model/employee')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'df8clipqz',
    api_key: '194894554869875',
    api_secret: 'onF0NwqgKYrmHOh6orIHCPspr3Y'
});

module.exports.addemployee = async (req, res) => {
    try {
        const { employeeID, name, lname, gender, birthday,

            email, phone, address, username, password, position_id,

            active, image } = req.body;

        if (!(username && password && name && lname)) {
            res.status(400).send("All input is required");
        }
        console.log("body", req.body)

        encryptedPassword = await bcrypt.hash(password, 10);

        const base64Image = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '',);

        // Upload base64 image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
            resource_type: "auto",
            folder: 'employee'
        });
        const user = await Employee.create({
            employeeID,
            name,
            lname,
            gender,
            birthday,
            // age,
            email,
            phone,
            address,
            username,
            password: encryptedPassword,
            position_id,
            image: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
            active,

        })
        const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2d"
            }
        )
        user.token = token;
        res.status(201).json(user);
    }
    catch (err) {
        res.json({ message: err });
    }
}
module.exports.getemployee = async (req, res) => {
    try {
        const employee = await Employee.find();
        res.json(employee);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.updateemployee = async (req, res) => {
    try {
        const id = req.params.id; 
        const { employeeID, name, lname, gender, birthday,

            email, phone, address, username,  position_id,
password,
            active, image } = req.body;
       
        let updatedData = {
            name,
            employeeID,
            lname,
            gender,
            birthday,
            email,
            phone,
            address,
            username,
            password,
            position_id,
            active
        }
        if (image) {
            const base64Image = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

            // Upload base64 image to Cloudinary
            const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
                resource_type: 'auto',
                folder: 'employee'
            });

            updatedData.image = uploadedImage.secure_url;
            updatedData.public_id = uploadedImage.public_id;
        }

        const options = { new: true };
        const result = await Employee.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports.deleteEmployee = async (req, res) => {
    console.log(req.params)
    let data = await Employee.deleteOne(req.params);
    res.send(data);
}

module.exports.getEmployeeId = async (req, res) => {
    try {
        const data = await Employee.find({ _id: req.params.id });

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
