const serviceController = require('../../controllers/service.controller');
const serviceCreateSchema = require('../schemas/serviceCreate');
const validate = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');
const router = require('./client.route');

router.get('/services', authenticate, serviceController.getAllServices);
router.get('/services/:id', authenticate, serviceController.getServiceById);
router.get('/services/:id/serviceOfferers', authenticate, serviceController.getServiceOfferersThatOfferService);
router.post('/services', validate(serviceCreateSchema), serviceController.createService);
router.delete('/services/:id', authenticate, serviceController.deleteService);
router.patch('/services/:id', authenticate, serviceController.updateService);

module.exports = router;