const express = require('express');
const router = express.Router();
const sessionController = require('../../controllers/session.controller');
const createSessionSchema = require('../schemas/sessionCreate');
const validate = require('../middleware/validate');

router.post('/sessions', validate(createSessionSchema), sessionController.createSession);

module.exports = router;