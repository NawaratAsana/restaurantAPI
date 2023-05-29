const mongoose = require('mongoose');
const { Schema } = mongoose;
const memberSchema = new mongoose.Schema({

    name: { require: true,type: String },
    lname: {require: true, type: String },
    gender: {require: true, type: String },
    // email: {require: true, type: String },
    phone: { ttype: String },
    address: {require: true, type: String },
    // image: { type: Buffer },
    username: {require: true, type: String },
    password: {require: true, type: String },
    token: { type: String },
    role: {type: Schema.Types.ObjectId},
},{
 
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model('Member', memberSchema);