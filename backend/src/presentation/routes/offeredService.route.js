const express = require('express');
const router = express.Router();
const offeredServiceController = require('../../controllers/offeredService.controller');
const validate = require('../middleware/validate');
const offeredServiceCreateSchema = require('../schemas/offeredServiceCreate');
const authenticate = require('../middleware/authenticate');


router.get('/offeredServices', authenticate, offeredServiceController.getAllOfferedServices);
router.get('/offeredServices/:id', authenticate, offeredServiceController.getOfferedService);
router.post('/offeredServices', validate(offeredServiceCreateSchema), offeredServiceController.createOfferedService);
router.delete('/offeredServices/:id', authenticate, offeredServiceController.deleteOfferedService);

module.exports = router;
