const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodTypeSchema = new mongoose.Schema({
      name: { type: String }
}, {

      versionKey: false
}
)

module.exports = mongoose.model('FoodType', FoodTypeSchema)