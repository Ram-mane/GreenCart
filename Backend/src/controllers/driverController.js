const Driver = require('../models/Driver');

async function list(req, res) {
  const drivers = await Driver.find();
  res.json(drivers);
}

async function create(req, res) {
  const d = new Driver(req.body);
  await d.save();
  res.status(201).json(d);
}

module.exports = { list, create };
