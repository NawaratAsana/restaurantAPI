const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeedata = new mongoose.Schema({
    employeeID: { required: true, type: String },
    name: { required: true, type: String },
    lname: { required: true, type: String },
    gender: { required: true, type: String },
    birthday: { required: true, type: Date},
    email: { required: true, type: String },
    phone: { type: String },
    address: { required: true, type: String },
    username: { required: true, type: String },
    password: { required: true, type: String },
    position_id: { required: true, type: String }, 
    active:{ required: true, type: Boolean }, 
    token: { type: String },  
    image: { type: String },
    public_id: { type: String },


}, {

    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('Employee', employeedata)