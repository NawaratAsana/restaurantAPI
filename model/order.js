const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({

    quantity: { require: true, type: Number },
    orderdate: { require: true, type: Date },
    order_id: { require: true, type: Schema.Types.ObjectId, Ref: 'Order' },
    member_id: {  type: Schema.Types.ObjectId, Ref: 'Member' },
    employee_id: {  type: Schema.Types.ObjectId, Ref: 'Employee' }



}, {
    
    timestamps: true,
    versionKey: false
}
)

module.exports = mongoose.model('Order', OrderSchema)