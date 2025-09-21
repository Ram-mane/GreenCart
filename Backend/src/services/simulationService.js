import { find } from '../models/Driver';
import { find as _find } from '../models/Route';
import { find as __find } from '../models/Order';

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
  const yesterdayHours = (driver.past7daysHours && driver.past7daysHours.length)
    ? driver.past7daysHours[driver.past7daysHours.length - 1]
    : 0;

  const timeMultiplier = (yesterdayHours > 8) ? 1.3 : 1.0;
  const simulatedTime = Math.round(route.baseTimeMinutes * timeMultiplier);

  const isLate = simulatedTime > (route.baseTimeMinutes + 10);
  const penalty = isLate ? 50 : 0;
  const bonus = (!isLate && order.valueRs > 1000) ? Math.round(order.valueRs * 0.10) : 0;
  const fuelCost = computeFuelCost(route.distanceKm, route.trafficLevel);
  const profit = Math.round(order.valueRs + bonus - penalty - fuelCost);

  return { simulatedTime, isLate, penalty, bonus, fuelCost, profit };
}

async function simulate({ numDrivers = 3, routeStartTime = "09:00", maxHoursPerDriver = 8 }) {
  // 1) load orders, routes, drivers
  const [orders, routes, driversAll] = await Promise.all([
    __find().lean(),
    _find().lean(),
    find().lean()
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
        past7daysHours: [0] // no fatigue
      });
    }
  }

  // prepare driver loads (minutes)
  const driverLoads = drivers.map(d => ({ driver: d, loadMinutes: 0 }));

  // map routeId -> route doc
  const routeMap = {};
  for (const r of routes) routeMap[r._id.toString()] = r;

  // If orders reference route by ObjectId, ensure we can get route:
  // If route saved in order is an ObjectId, we used lean() so it's stored as ObjectId.
  // We'll try to find by both string id or order.route (if it's already route object)
  const perOrderResults = [];

  // Sort orders by baseTime descending (long deliveries first) — heuristic
  const orderObjs = await Promise.all(orders.map(async (o) => {
    let r = null;
    if (o.route && typeof o.route === 'object' && o.route._id) r = o.route;
    else {
      const routeDoc = routes.find(rr => rr._id.toString() === (o.route ? o.route.toString() : ''));
      r = routeDoc;
    }
    return { order: o, route: r };
  }));

  orderObjs.sort((a, b) => (b.route?.baseTimeMinutes || 0) - (a.route?.baseTimeMinutes || 0));

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
      const yesterdayHours = (d.past7daysHours && d.past7daysHours.length) ? d.past7daysHours[d.past7daysHours.length - 1] : 0;
      const timeMultiplier = (yesterdayHours > 8) ? 1.3 : 1.0;
      const simulatedTime = Math.round(route.baseTimeMinutes * timeMultiplier);
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
    driverLoads[bestIdx].loadMinutes += chosen.simulatedTime;

    const driverDoc = driverLoads[bestIdx].driver;
    const computed = computeOrderFields(order, route, driverDoc);

    perOrderResults.push({
      orderId: order.orderId,
      driverId: driverDoc._id,
      routeId: route._id,
      simulatedTime: computed.simulatedTime,
      isLate: computed.isLate,
      penalty: computed.penalty,
      bonus: computed.bonus,
      fuelCost: computed.fuelCost,
      profit: computed.profit
    });
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

export default { simulate };
