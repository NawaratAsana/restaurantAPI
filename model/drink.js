const mongoose = require('mongoose');
const { Schema } = mongoose;

const DrinkSchema = new mongoose.Schema({
      drink:{ type: String},
      photo:{type:String},
      price:{type:Number},
      typeDrink_id:{require: true, type: Schema.Types.ObjectId, Ref: 'DrinkType'}


},{
   
    timestamps: true,
    versionKey: false
  }  
)

module.exports = mongoose.model('Drink', DrinkSchema)