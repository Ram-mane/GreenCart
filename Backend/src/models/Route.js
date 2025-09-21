const { Schema, model } = require('mongoose');

const RouteSchema = new Schema({
  route_id: { type: String, required: true },
  distance_km: { type: Number, required: true },
  traffic_level: { type: String, enum: ['Low','Medium','High'], default: 'Low' },
  base_time_min: { type: Number, required: true }
}, { timestamps: true });

module.exports = model('Route', RouteSchema);
