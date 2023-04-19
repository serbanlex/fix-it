const express = require('express');
const router = express.Router();
const clientController = require('../../controllers/client.controller');
const validate = require('../middleware/validate');
const clientCreateSchema = require('../schemas/clientCreate');

router.get('/clients', clientController.getAllClients);
router.get('/clients/:id', clientController.getClientById);
router.post('/clients', validate(clientCreateSchema), clientController.createClient);


module.exports = router;
