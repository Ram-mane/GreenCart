import { Schema, model } from 'mongoose';

const RouteSchema = new Schema({
  routeId: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  trafficLevel: { type: String, enum: ['Low','Medium','High'], default: 'Low' },
  baseTimeMinutes: { type: Number, required: true }
}, { timestamps: true });

export default model('Route', RouteSchema);
