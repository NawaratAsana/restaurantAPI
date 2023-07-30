const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodSchema = new mongoose.Schema({

    quantity: { require: true, type: Number },
    order_id: { require: true, type: Schema.Types.ObjectId, Ref: 'Order' },
    food_id: { require: true, type: Schema.Types.ObjectId, Ref: 'Food' },
   
}, {
   
    timestamps: true,
    versionKey: false
}
)

module.exports = mongoose.model('OrderFood', FoodSchema)