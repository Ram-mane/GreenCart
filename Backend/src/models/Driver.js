const { Schema, model } = require('mongoose');

const DriverSchema = new Schema({
  name: { type: String, required: true },
  past7daysHours: { type: [Number], default: [] } // last element = yesterday
}, { timestamps: true });

module.exports = model('Driver', DriverSchema);
