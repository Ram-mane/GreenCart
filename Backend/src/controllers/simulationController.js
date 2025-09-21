import { simulate } from '../services/simulationService';
import SimulationResult, { find, findById } from '../models/SimulationResult';

export async function runSimulation(req, res) {
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

export async function listSimulations(req, res) {
  const sims = await find().sort({ createdAt: -1 }).limit(20);
  res.json(sims);
}

export async function getSimulationById(req, res) {
  const id = req.params.id;
  const sim = await findById(id);
  if (!sim) return res.status(404).json({ error: 'Not found' });
  res.json(sim);
}
