const express = require('express');
const router = express.Router();
const ServiceCategoryController = require('../../controllers/serviceCategory.controller');
const validate = require('../middleware/validate');
const serviceCategorySchema = require('../schemas/serviceCategoryCreate');

router.get('/serviceCategories', ServiceCategoryController.getAllServiceCategories);
router.get('/serviceCategories/:id', ServiceCategoryController.getServiceCategoryById);
router.post('/serviceCategories', validate(serviceCategorySchema), ServiceCategoryController.createServiceCategory);
router.get('/serviceCategories/:id/services', ServiceCategoryController.getServicesBelongingToCategory);
router.delete('/serviceCategories/:id', ServiceCategoryController.deleteServiceCategory);

module.exports = router;