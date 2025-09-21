const Driver = require('../models/Driver');
const Route = require('../models/Route');
const Order = require('../models/Order');

/**
 * Simulation rules implemented:
 * - Fatigue: if yesterdayHours > 8 => timeMultiplier = 1.3
 * - Penalty: if simulatedTime > baseTime + 10 -> penalty = 50
 * - Bonus: if valueRs > 1000 AND on-time -> bonus = 10% of value
 * - Fuel: perKm = 5 + (traffic === 'High' ? 2 : 0)
 * - Allocation: greedy by least loaded driver, respecting max hours if possible.
 */

function computeFuelCost(distanceKm, trafficLevel) {
  const perKm = 5 + (trafficLevel === 'High' ? 2 : 0);
  return distanceKm * perKm;
}

function computeOrderFields(order, route, driver) {
  // Use correct driver and route fields from new schema
  const weekHours = driver.past_week_hours || [];
  const yesterdayHours = weekHours.length ? weekHours[weekHours.length - 1] : 0;
  const timeMultiplier = (yesterdayHours > 8) ? 1.3 : 1.0;
  const simulatedTime = Math.round((route.base_time_min || 0) * timeMultiplier);
  const isLate = simulatedTime > ((route.base_time_min || 0) + 10);
  const bonus = (!isLate && order.value_rs > 1000) ? Math.round(order.value_rs * 0.10) : 0;
  const penalty = isLate ? 50 : 0;
  const fuelCost = computeFuelCost(route.distance_km || 0, route.traffic_level || 'Low');
  const profit = Math.round((order.value_rs || 0) + bonus - penalty - fuelCost);
  return { simulatedTime, isLate, penalty, bonus, fuelCost, profit };
}

async function simulate({ numDrivers = 3, routeStartTime = "09:00", maxHoursPerDriver = 8 }) {
  // 1) load orders, routes, drivers
  const [orders, routes, driversAll] = await Promise.all([
    Order.find().lean(),
    Route.find().lean(),
    Driver.find().lean()
  ]);

  if (!orders.length) throw new Error('No orders in DB. Run seed script or POST /orders');

  // Choose first numDrivers drivers; if insufficient, replicate drivers (fast fallback) 
  let drivers = driversAll.slice(0, numDrivers);
  if (drivers.length < numDrivers) {
    // create virtual drivers by cloning existing ones or create placeholders
    const placeholderCount = numDrivers - drivers.length;
    for (let i = 0; i < placeholderCount; i++) {
      drivers.push({
        _id: `virtual-${i}`,
        name: `virtual-driver-${i}`,
        past_week_hours: [0] // no fatigue
      });
    }
  }

  // prepare driver loads (minutes)
  const driverLoads = drivers.map(d => ({ driver: d, loadMinutes: 0 }));

  // map route_id -> route doc
  const routeMap = {};
  for (const r of routes) routeMap[r.route_id] = r;

  // Link orders to routes using route_id
  const perOrderResults = [];
  const orderObjs = orders.map(o => {
    const r = routeMap[o.route_id];
    return { order: o, route: r };
  });
  orderObjs.sort((a, b) => (b.route?.base_time_min || 0) - (a.route?.base_time_min || 0));

  for (const { order, route } of orderObjs) {
    if (!route) {
      // skip or mark invalid
      perOrderResults.push({
        orderId: order.orderId,
        error: 'Route missing'
      });
      continue;
    }

    // pick driver with least load who can accommodate simulated minutes <= maxHours; else pick least loaded.
    // But we need timeMultiplier to compute simulatedTime -> depends on driver
    // We'll compute simulatedTime for each driver and choose best fit (least new load that stays <= max)
    let bestIdx = 0;
    let bestFit = Infinity;
    let chosen = null;
    for (let i = 0; i < driverLoads.length; i++) {
      const d = driverLoads[i].driver;
      const weekHours = d.past_week_hours || [];
      const yesterdayHours = weekHours.length ? weekHours[weekHours.length - 1] : 0;
      const timeMultiplier = (yesterdayHours > 8) ? 1.3 : 1.0;
      const simulatedTime = Math.round((route.base_time_min || 0) * timeMultiplier);
      const newLoad = driverLoads[i].loadMinutes + simulatedTime;
      // prefer drivers that do not exceed allowed max (Hmax * 60)
      const limit = maxHoursPerDriver * 60;
      const exceeds = newLoad > limit;
      const penaltyForExceed = exceeds ? 1000000 : newLoad; // big penalty for exceed
      if (penaltyForExceed < bestFit) {
        bestFit = penaltyForExceed;
        bestIdx = i;
        chosen = { driver: d, simulatedTime, timeMultiplier };
      }
    }

    // assign to chosen
    if (!chosen) {
      // Mark as unassigned instead of throwing
      perOrderResults.push({
        order_id: order.order_id,
        error: 'No suitable driver found'
      });
      continue;
    }
    driverLoads[bestIdx].loadMinutes += chosen.simulatedTime;

    const driverDoc = driverLoads[bestIdx].driver;
    const computed = computeOrderFields(order, route, driverDoc);

    perOrderResults.push({
      order_id: order.order_id,
      driver_name: driverDoc.name,
      route_id: route.route_id,
      simulatedTime: computed.simulatedTime,
      isLate: computed.isLate,
      penalty: computed.penalty,
      bonus: computed.bonus,
      fuelCost: computed.fuelCost,
      profit: computed.profit
    });
    console.log(`Order ${order.order_id}: fuelCost = ${computed.fuelCost}`);
  }

  // KPIs
  const totalProfit = perOrderResults.reduce((s, r) => s + (r.profit || 0), 0);
  const totalDeliveries = perOrderResults.filter(r => !r.error).length;
  const totalOnTime = perOrderResults.filter(r => r.isLate === false).length;
  const efficiency = totalDeliveries ? Math.round((totalOnTime / totalDeliveries) * 10000) / 100 : 0; // two decimals
  const totalFuel = perOrderResults.reduce((s, r) => s + (r.fuelCost || 0), 0);

  return {
    perOrderResults,
    KPIs: {
      totalProfit,
      totalDeliveries,
      totalOnTime,
      efficiency,
      totalFuel
    }
  };
}

module.exports = { simulate };
