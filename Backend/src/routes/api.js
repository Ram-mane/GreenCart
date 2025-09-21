import { Router } from 'express';
const router = Router();

import { list, create } from '../controllers/driverController';
import { list as _list, create as _create } from '../controllers/routeController';
import { list as __list, create as __create } from '../controllers/orderController';
import { runSimulation, listSimulations, getSimulationById } from '../controllers/simulationController';

router.get('/drivers', list);
router.post('/drivers', create);

router.get('/routes', _list);
router.post('/routes', _create);

router.get('/orders', __list);
router.post('/orders', __create);

router.post('/simulate', runSimulation);
router.get('/simulations', listSimulations);
router.get('/simulations/:id', getSimulationById);

export default router;
