const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  order_id: { type: String, required: true },
  value_rs: { type: Number, required: true },
  route_id: { type: String, required: true },
  delivery_time: { type: String }, // keep as string (hh:mm) from CSV
  route: { type: Schema.Types.ObjectId, ref: 'Route' } // for population after linking
}, { timestamps: true });

module.exports = model('Order', OrderSchema);
