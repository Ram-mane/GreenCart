const { Router } = require('express');
const router = Router();

const driverController = require('../controllers/driverController');
const routeController = require('../controllers/routeController');
const orderController = require('../controllers/orderController');
const simulationController = require('../controllers/simulationController');


router.get('/drivers', driverController.list);
router.post('/drivers', driverController.create);

router.get('/routes', routeController.list);
router.post('/routes', routeController.create);

router.get('/orders', orderController.list);
router.post('/orders', orderController.create);

router.post('/simulate', simulationController.runSimulation);
router.get('/simulations', simulationController.listSimulations);
if (simulationController.getSimulationById) {
	router.get('/simulations/:id', simulationController.getSimulationById);
}

module.exports = router;
