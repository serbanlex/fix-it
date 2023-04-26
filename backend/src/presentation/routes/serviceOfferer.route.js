const express = require('express');
const router = express.Router();
const serviceOffererController = require('../../controllers/serviceOfferer.controller');
const serviceOffererCreateSchema = require('../../presentation/schemas/serviceOffererCreate');
const validate = require('../../presentation/middleware/validate');
const authenticate = require('../middleware/authenticate');

router.get('/serviceOfferers', authenticate, serviceOffererController.getAllServiceOfferers);
router.get('/serviceOfferers/:id', authenticate, serviceOffererController.getServiceOffererById);
router.post('/serviceOfferers', validate(serviceOffererCreateSchema), serviceOffererController.createServiceOfferer);


module.exports = router;