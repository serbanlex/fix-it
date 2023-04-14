var express = require('express');
const clients = require('./clients');

const router = express.Router();

router.use(clients);

module.exports = router;