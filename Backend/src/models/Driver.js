const { Schema, model } = require('mongoose');

const DriverSchema = new Schema({
  name: { type: String, required: true },
  shift_hours: { type: Number, required: true },
  past_week_hours: { type: [Number], default: [] } // 7 days, as per CSV
}, { timestamps: true });

module.exports = model('Driver', DriverSchema);
