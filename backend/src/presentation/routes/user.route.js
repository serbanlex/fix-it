const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const authenticate = require('../middleware/authenticate');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', authenticate, userController.deleteUser);

module.exports = router;
