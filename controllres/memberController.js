const member = require('../model/member');
const { db } = require('../model/member')
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'df8clipqz',
    api_key: '194894554869875',
    api_secret: 'onF0NwqgKYrmHOh6orIHCPspr3Y'
});

module.exports.register = async (req, res) => {

    try {
        const { name, lname, gender,

            email, phone, address, username, password, birthday,

            image } = req.body;

        if (!(username && password && name && lname)) {
            res.status(400).send("All input is required");
        }
        console.log("body", req.body)

        encryptedPassword = await bcrypt.hash(password, 10);

        const base64Image = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '',);

        // Upload base64 image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
            resource_type: "auto",
            folder: 'member'
        });
        const user = await member.create({
            name,
            lname,
            gender,
            birthday,
            email,
            phone,
            address,
            username,
            password: encryptedPassword,
            image: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
            role: "63f512a60e947c18f97769a0"

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
module.exports.getMember = async (req, res) => {
    try {
        const Member = await member.find();
        res.json(Member);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.updateMember = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, lname, gender, birthday,

            email, phone, address, username, password,  image } = req.body;
        let updatedData = {
            name,
            lname,
            gender,
            birthday,
            email,
            phone,
            address,
            username,
            password,
            role: "63f512a60e947c18f97769a0"
        }
        if (image) {
            const base64Image = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

            // Upload base64 image to Cloudinary
            const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
                resource_type: 'auto',
                folder: 'member'
            });

            updatedData.image = uploadedImage.secure_url;
            updatedData.public_id = uploadedImage.public_id;
        }

        const options = { new: true };
        const result = await member.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports.deleteMember = async (req, res) => {
    console.log(req.params)
    let data = await member.deleteOne(req.params);
    res.send(data);
}
module.exports.getMemberId = async (req, res) => {

    try {
          
        const data = await member.find({ _id: req.params.id });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
