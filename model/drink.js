const mongoose = require('mongoose');
const { Schema } = mongoose;

const DrinkSchema = new mongoose.Schema({
  name: { required: true, type: String },
  image: { type: String },
  public_id: { type: String },
  price: { required: true, type: Number },
  typeDrink_id: { require: true, type: Schema.Types.ObjectId, Ref: 'DrinkType' }


}, {

  timestamps: true,
  versionKey: false
}
)

module.exports = mongoose.model('Drink', DrinkSchema)