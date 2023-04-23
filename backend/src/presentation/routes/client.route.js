const express = require('express');
const router = express.Router();
const clientController = require('../../controllers/client.controller');
const validate = require('../middleware/validate');
const clientCreateSchema = require('../schemas/clientCreate');
const authenticate = require('../middleware/authenticate');


router.get('/clients', authenticate, clientController.getAllClients);
router.get('/clients/:id', authenticate, clientController.getClientById);
router.post('/clients', authenticate, validate(clientCreateSchema), clientController.createClient);


module.exports = router;
