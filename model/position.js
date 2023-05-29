const mongoose = require('mongoose');
const { Schema } = mongoose;

const PositionSchema = new mongoose.Schema({
      name:{ type: String}
},{

    timestamps: true,
    versionKey: false
  }  
)

module.exports = mongoose.model('Position', PositionSchema)