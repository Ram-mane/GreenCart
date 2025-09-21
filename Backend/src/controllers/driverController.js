import Driver, { find } from '../models/Driver';

export async function list(req, res) {
  const drivers = await find();
  res.json(drivers);
}

export async function create(req, res) {
  const d = new Driver(req.body);
  await d.save();
  res.status(201).json(d);
}
