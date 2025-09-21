require('dotenv').config();
const connectDB = require('../config/db');
const Driver = require('../models/Driver');
const Route = require('../models/Route');
const Order = require('../models/Order');

const drivers = [
  { name: 'Driver A', past7daysHours: [7,7,8,6,9,9,7] },
  { name: 'Driver B', past7daysHours: [6,6,6,6,6,6,6] },
  { name: 'Driver C', past7daysHours: [9,9,9,9,9,9,9] }
];

const routes = [
  { routeId: 'R1', distanceKm: 10, trafficLevel: 'High', baseTimeMinutes: 30 },
  { routeId: 'R2', distanceKm: 5, trafficLevel: 'Low', baseTimeMinutes: 15 },
  { routeId: 'R3', distanceKm: 20, trafficLevel: 'Medium', baseTimeMinutes: 45 }
];

const orders = [
  { orderId: 'O1', valueRs: 1200, /* route: will be linked after creating routes */ },
  { orderId: 'O2', valueRs: 500 },
  { orderId: 'O3', valueRs: 1500 },
  { orderId: 'O4', valueRs: 200 }
];

async function seed() {
  await connectDB();
  await Driver.deleteMany({});
  await Route.deleteMany({});
  await Order.deleteMany({});

  const createdDrivers = await Driver.insertMany(drivers);
  const createdRoutes = await Route.insertMany(routes);

  // link routes to orders round robin
  for (let i = 0; i < orders.length; i++) {
    orders[i].route = createdRoutes[i % createdRoutes.length]._id;
  }
  await Order.insertMany(orders);

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
