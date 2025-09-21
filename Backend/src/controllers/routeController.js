const Route = require('../models/Route');

async function list(req, res) {
  const routes = await Route.find();
  res.json(routes);
}

async function create(req, res) {
  const r = new Route(req.body);
  await r.save();
  res.status(201).json(r);
}

module.exports = { list, create };
