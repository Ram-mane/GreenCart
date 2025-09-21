const Order = require('../models/Order');

async function list(req, res) {
  const orders = await Order.find().populate('route');
  res.json(orders);
}

async function create(req, res) {
  const o = new Order(req.body);
  await o.save();
  res.status(201).json(o);
}

module.exports = { list, create };
