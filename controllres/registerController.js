const member = require('../model/member');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports.add_user = async (req, res) => {
    try {
        const {
            name,
            lname,
            gender,
            phone,
            address,
            // photo,
            username,
            password,
            role
        } = req.body;
        if (!(username && password && name && lname)) {
            res.status(400).send("All input is required");
        }
        
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await member.create({
            name,
            lname,
            gender,
            phone,
            address,
            // photo,
            username,
            password: encryptedPassword,
            role: '63f512a60e947c18f97769a0'
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
    } catch (err) {
        console.log(err);
    }
}