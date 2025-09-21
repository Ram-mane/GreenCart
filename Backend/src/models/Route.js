const { Schema, model } = require('mongoose');

const RouteSchema = new Schema({
  routeId: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  trafficLevel: { type: String, enum: ['Low','Medium','High'], default: 'Low' },
  baseTimeMinutes: { type: Number, required: true }
}, { timestamps: true });

module.exports = model('Route', RouteSchema);
