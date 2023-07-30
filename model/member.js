const mongoose = require('mongoose');
const { Schema } = mongoose;
const memberSchema = new mongoose.Schema({

    name: { require: true,type: String },
    lname: {require: true, type: String },
    gender: {require: true, type: String },
    birthday: { required: true, type: Date},
    email: {require: true, type: String },
    phone: { type: String },
    address: {require: true, type: String },
    image: { type: String },
    public_id: { type: String },
    username: {require: true, type: String },
    password: {require: true, type: String },
    token: { type: String },
    role: {type:String},

},{
 
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model('Member', memberSchema);