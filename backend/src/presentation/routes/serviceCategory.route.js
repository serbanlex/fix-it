const express = require('express');
const router = express.Router();
const ServiceCategoryController = require('../../controllers/serviceCategory.controller');
const validate = require('../middleware/validate');
const serviceCategorySchema = require('../schemas/serviceCategoryCreate');
const authenticate = require('../middleware/authenticate');

router.get('/serviceCategories', authenticate, ServiceCategoryController.getAllServiceCategories);
router.get('/serviceCategories/:id', authenticate, ServiceCategoryController.getServiceCategoryById);
router.post('/serviceCategories', authenticate, validate(serviceCategorySchema), ServiceCategoryController.createServiceCategory);
router.get('/serviceCategories/:id/services', authenticate, ServiceCategoryController.getServicesBelongingToCategory);
router.delete('/serviceCategories/:id', authenticate, ServiceCategoryController.deleteServiceCategory);

module.exports = router;