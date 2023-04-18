var express = require('express');
const clientRoute = require('./client.route');
const userRoute = require('./user.route');

const router = express.Router();

router.use(clientRoute);
router.use(userRoute);


module.exports = router;