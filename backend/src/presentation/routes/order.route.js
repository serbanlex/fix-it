const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order.controller');
const validate = require('../middleware/validate');
const orderCreateSchema = require('../schemas/orderCreate.js');
const authenticate = require('../middleware/authenticate');


router.get('/orders', authenticate, orderController.getAllOrders);
router.get('/orders/:id', authenticate, orderController.getOrderById);
router.post('/orders', validate(orderCreateSchema), orderController.createOrder);
router.delete('/orders/:id', authenticate, orderController.deleteOrder);
router.get('/orders/client/:clientID', authenticate, orderController.getAllOrdersWithClientID);
router.get('/orders/serviceOfferer/:serviceOffererID', authenticate, orderController.getAllOrdersWithServiceOffererID);
router.put('/orders/:id/state', authenticate, orderController.updateOrderState); // todo: this could be a patch for all of the order


module.exports = router;