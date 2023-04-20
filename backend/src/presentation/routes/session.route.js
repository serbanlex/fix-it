const express = require('express');
const router = express.Router();
const sessionController = require('../../controllers/session.controller');
const createSessionSchema = require('../schemas/sessionCreate');
const validate = require('../middleware/validate');

router.post('/session', validate(createSessionSchema), sessionController.createSession);
router.get('/session', sessionController.getCurrentSesssion);
router.delete('/session', sessionController.deleteSession);
module.exports = router;