const express = require('express');
const router = express.Router();
const clientController = require('../../controllers/client.controller');
const validate = require('../middleware/validate');
const clientCreate = require('../schemas/clientCreate');

router.get('/clients', clientController.getAllClients);
router.get('/clients/:id', clientController.getClientById);
router.post('/clients', validate(clientCreate), clientController.createClient);


module.exports = router;
