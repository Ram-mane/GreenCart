const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  orderId: { type: String, required: true },
  valueRs: { type: Number, required: true },
  route: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
  deliveryTimestamp: { type: Date } // optional for seeded data
}, { timestamps: true });

module.exports = model('Order', OrderSchema);
