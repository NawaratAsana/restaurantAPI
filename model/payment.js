const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new mongoose.Schema({

    image: { type: String },
    order_id: { required: true, type: Schema.Types.ObjectId, Ref: 'Order' },
    payment_status: { type: String, enum: ['รอการชำระเงิน', 'รอการยืนยัน','ชำระเงินแล้ว',"ยกเลิก"], default: 'รอการชำระเงิน', required: true },
    public_id: { type: String },
}, {

    timestamps: true,
    versionKey: false
}
)

module.exports = mongoose.model('Payment', PaymentSchema)