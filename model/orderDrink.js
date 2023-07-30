const mongoose = require('mongoose');
const { Schema } = mongoose;

const DrinkSchema = new mongoose.Schema({

    quantity: { require: true, type: Number },
    order_id: { require: true, type: Schema.Types.ObjectId, Ref: 'Order' },
    drink_id: { require: true, type: Schema.Types.ObjectId, Ref: 'Drink' },

}, {

    timestamps: true,
    versionKey: false
}
)

module.exports = mongoose.model('Orderdrink', DrinkSchema)