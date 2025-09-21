const { simulate } = require('../services/simulationService');
const SimulationResult = require('../models/SimulationResult');

async function runSimulation(req, res) {
  try {
    const input = req.body;
    const result = await simulate(input);

    // persist if requested (default true)
    if (input.persist !== false) {
      const sr = new SimulationResult({
        input,
        perOrderResults: result.perOrderResults,
        KPIs: result.KPIs
      });
      await sr.save();
      result.simulationId = sr._id;
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Simulation error' });
  }
}

async function listSimulations(req, res) {
  const sims = await SimulationResult.find().sort({ createdAt: -1 }).limit(20);
  res.json(sims);
}

async function getSimulationById(req, res) {
  const id = req.params.id;
  const sim = await SimulationResult.findById(id);
  if (!sim) return res.status(404).json({ error: 'Not found' });
  res.json(sim);
}

module.exports = { runSimulation, listSimulations, getSimulationById };
