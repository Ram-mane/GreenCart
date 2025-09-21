const { Schema, model } = require('mongoose');

const SimulationResultSchema = new Schema({
  input: { type: Object },
  perOrderResults: { type: [Object] },
  KPIs: { type: Object }
}, { timestamps: true });

module.exports = model('SimulationResult', SimulationResultSchema);
