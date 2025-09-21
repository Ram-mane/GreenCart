require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const connectDB = require('../config/db');
const Driver = require('../models/Driver');
const Route = require('../models/Route');
const Order = require('../models/Order');

function parseDriversCSV() {
  const filePath = path.join(__dirname, '../../csvData/GreenCart_Logistics_Assessment/drivers.csv');
  const content = fs.readFileSync(filePath, 'utf8');
  const records = parse(content, { columns: true, skip_empty_lines: true });
  return records.map(d => ({
    name: d.name,
    shift_hours: Number(d.shift_hours),
    past_week_hours: d.past_week_hours.split('|').map(Number)
  }));
}

function parseRoutesCSV() {
  const filePath = path.join(__dirname, '../../csvData/GreenCart_Logistics_Assessment/routes.csv');
  const content = fs.readFileSync(filePath, 'utf8');
  const records = parse(content, { columns: true, skip_empty_lines: true });
  return records.map(r => ({
    route_id: r.route_id,
    distance_km: Number(r.distance_km),
    traffic_level: r.traffic_level,
    base_time_min: Number(r.base_time_min)
  }));
}

function parseOrdersCSV() {
  const filePath = path.join(__dirname, '../../csvData/GreenCart_Logistics_Assessment/orders.csv');
  const content = fs.readFileSync(filePath, 'utf8');
  const records = parse(content, { columns: true, skip_empty_lines: true });
  return records.map(o => ({
    order_id: o.order_id,
    value_rs: Number(o.value_rs),
    route_id: o.route_id,
    delivery_time: o.delivery_time
  }));
}

async function seed() {
  await connectDB();
  await Driver.deleteMany({});
  await Route.deleteMany({});
  await Order.deleteMany({});

  // Parse CSVs
  const drivers = parseDriversCSV();
  const routes = parseRoutesCSV();
  const orders = parseOrdersCSV();

  // Insert drivers and routes
  const createdDrivers = await Driver.insertMany(drivers);
  const createdRoutes = await Route.insertMany(routes);

  // Map route_id to _id for linking
  const routeIdMap = {};
  createdRoutes.forEach(r => { routeIdMap[r.route_id] = r._id; });

  // Link orders to route ObjectId
  orders.forEach(o => {
    o.route = routeIdMap[o.route_id];
  });
  await Order.insertMany(orders);

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
