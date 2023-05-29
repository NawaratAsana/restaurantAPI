const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodSchema = new mongoose.Schema({
  name: { require: true, type: String },
  image:{type:Buffer}, // Store image data as a Buffer
  // image: { data: Buffer, contentType: String }, // Store image data as a Buffer
  price: { require: true, type: Number },
  typeFood_id: { require: true, type: Schema.Types.ObjectId, ref: 'FoodType' }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Food', FoodSchema);
