var express = require('express');
const clientRoute = require('./client.route');
const userRoute = require('./user.route');
const serviceOffererRoute = require('./serviceOfferer.route');
const sessionRoute = require('./session.route');
const serviceRoute = require('./service.route');
const serviceCategoryRoute = require('./serviceCategory.route');
const offeredServiceRoute = require('./offeredService.route');
const orderRoute = require('./order.route');
const errorHandler = require('../middleware/errorHandler');

const router = express.Router();

router.use(clientRoute);
router.use(userRoute);
router.use(serviceOffererRoute);
router.use(sessionRoute);
router.use(serviceRoute);
router.use(serviceCategoryRoute);
router.use(offeredServiceRoute);
router.use(orderRoute);

router.use(errorHandler);

module.exports = router;