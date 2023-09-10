const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
  order_number: { type: String, unique: true, required: true },
  total_amount: { require: true, type: Number },
  order_date: { require: true, type: Date },
  member_id: { type: Schema.Types.ObjectId, Ref: 'Member' },
  employee_id: { type: Schema.Types.ObjectId, Ref: 'Employee' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled', 'completed'],
    default: 'pending',
    required: true,
  },
  delivery_type: { type: String, enum: ['Dine-in', 'Takeaway', 'Delivery'], required: true },
  delivery_location: { type: String },
  cancellation_reason:{type: String}
},

  {

    timestamps: true,
    versionKey: false
  }
)

OrderSchema.statics.findLastOrderByDeliveryType = async function (deliveryType) {
  const lastOrder = await this.findOne({ delivery_type: deliveryType })
    .sort({ order_number: -1 })
    .exec();
  return lastOrder;
};

module.exports = mongoose.model('Order', OrderSchema)