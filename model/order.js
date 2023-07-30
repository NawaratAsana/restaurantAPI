const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({

    total_amount: { require: true, type: Number },
    order_date: { require: true, type: Date },
    member_id: {  type: Schema.Types.ObjectId, Ref: 'Member' },
    employee_id: {  type: Schema.Types.ObjectId, Ref: 'Employee' },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled', 'completed'],
        default: 'pending',
        required: true,
      },
      delivery_type: { type: String, enum: ['Dine-in', 'Takeaway', 'delivery'], required: true },
      payment_status: { type: String, enum: ['รอการชำระเงิน', 'ชำระเงินแล้ว'], default: 'รอการชำระเงิน' },
}, {
    
    timestamps: true,
    versionKey: false
}
)

module.exports = mongoose.model('Order', OrderSchema)