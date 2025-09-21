import { Schema, model } from 'mongoose';

const SimulationResultSchema = new Schema({
  input: { type: Object },
  perOrderResults: { type: [Object] },
  KPIs: { type: Object }
}, { timestamps: true });

export default model('SimulationResult', SimulationResultSchema);
