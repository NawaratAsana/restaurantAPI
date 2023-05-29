const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeedata = new mongoose.Schema({
    employeeID: { require: true, type: String },
    name: { require: true, type: String },
    lname: { require: true, type: String },
    gender: { require: true, type: String },
    birthday: { require: true, type: Date},
    age: { require: true, type: Number },
    email: { require: true, type: String },
    phone: { type: String },
    address: { require: true, type: String },
    photo: { require: true, type: String },
    username: { require: true, type: String },
    password: { require: true, type: String },
    position_id: { require: true, type: String }, 
    active:{ require: true, type: Boolean }, 
    role: { type: Schema.Types.ObjectId },
    token: { type: String },

}, {

    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('Employee', employeedata)