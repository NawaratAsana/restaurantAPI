const Employee = require('../model/employee')
// const { db } = require('../model/employee')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
module.exports.addemployee = async (req, res) => {
    try {
        const {
            employeeID,
            name,
            lname,
            gender,
            birthday,
            age,
            email,
            phone,
            address,
            photo,
            username,
            password,
            position_id,
            role,
            active,
        } = req.body;
        if (!(username && password && name && lname)) {
            res.status(400).send("All input is required");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await Employee.create({
            employeeID,
            name,
            lname,
            gender,
            birthday,
            age,
            email,
            phone,
            address,
            photo,
            username,
            password: encryptedPassword,
            position_id,
            role,
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



    // ของเดิม
    // const NewEmployee = new Employee({
    //     employeeID: req.body.employeeID,
    //     name: req.body.name,
    //     lname: req.body.lname,
    //     gender: req.body.gender,
    //     birthday: req.body.birthday,
    //     age: req.body.age,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     address: req.body.address,
    //     photo: req.body.photo,
    //     username: req.body.username,
    //     password:req.body.password,
    //     position_id: req.body.position_id,
    //     role:req.body.role,
    //     active: req.body.active,
    // });
    // try {
    //     const saveEmployee = await NewEmployee.save();
    //     res.json(saveEmployee);
    // } catch (err) {
    //     res.json({ message: err });
    // }
}
module.exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.find();
        res.json(employee);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.updateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
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
