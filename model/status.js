const mongoose = require('mongoose');
const { Schema } = mongoose;

const StatusSchema = new mongoose.Schema({
      name:{ type: String}
},{

    versionKey: false
  }  
)

module.exports = mongoose.model('Status', StatusSchema)