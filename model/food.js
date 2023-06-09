const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodSchema = new Schema({
  name: { required: true, type: String },
  image: { type: String },
  price: { required: true, type: Number },
  typeFood_id: { required: true, type: Schema.Types.ObjectId, ref: 'FoodType' }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Food', FoodSchema);
