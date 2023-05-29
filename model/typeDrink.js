const mongoose = require('mongoose');
const { Schema } = mongoose;

const DrinkTypeSchema = new mongoose.Schema({
      name: { type: String }
}, {

      versionKey: false
}
)

module.exports = mongoose.model('DrinkType', DrinkTypeSchema)