import { Schema, model } from 'mongoose';

const DriverSchema = new Schema({
  name: { type: String, required: true },
  past7daysHours: { type: [Number], default: [] } // last element = yesterday
}, { timestamps: true });

export default model('Driver', DriverSchema);
