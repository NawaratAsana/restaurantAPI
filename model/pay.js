const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaySchema = new mongoose.Schema({

    total_inc: { require: true, type: Number },
    cash: { require: true, type: Number },
    change: { require: true, type: Number },
    slip: { require: true, type: String },
    order_id: { require: true, type: Schema.Types.ObjectId, Ref: 'Order' },
   


}, {
 
    timestamps: true,
    versionKey: false
}
)

module.exports = mongoose.model('Pay', PaySchema)