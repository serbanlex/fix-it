var express = require('express');
const clientRoute = require('./client.route');
const userRoute = require('./user.route');
const serviceOffererRoute = require('./serviceOfferer.route');
const sessionRoute = require('./session.route');
const errorHandler = require('../middleware/errorHandler');

const router = express.Router();

router.use(clientRoute);
router.use(userRoute);
router.use(serviceOffererRoute);
router.use(sessionRoute)

router.use(errorHandler);

module.exports = router;