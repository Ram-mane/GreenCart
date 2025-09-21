const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  past7daysHours: { type: [Number], default: [] } // last element = yesterday
}, { timestamps: true });

module.exports = mongoose.model('Driver', DriverSchema);
