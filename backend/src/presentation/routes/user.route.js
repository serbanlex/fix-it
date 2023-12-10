const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const authenticate = require('../middleware/authenticate');
const validate = require("../middleware/validate");
const userEditSchema = require("../schemas/userEdit");

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', authenticate, userController.deleteUser);
router.patch('/users/:id', validate(userEditSchema), userController.editUser);

module.exports = router;
