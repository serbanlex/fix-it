const express = require('express');
const router = express.Router();

const reviewController = require('../../controllers/review.controller');
const reviewCreateSchema = require('../schemas/reviewCreate');

const validate = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');


router.get('/reviews', authenticate, reviewController.getAllReviews);
router.get('/reviews/:id', authenticate, reviewController.getReviewById);
router.get('/reviews/order/:id', authenticate, reviewController.getAllReviewsWithOrderID);
router.get('/reviews/client/:id', authenticate, reviewController.getAllReviewsWithClientID);
router.get('/reviews/offeredService/:id', authenticate, reviewController.getAllReviewsWithOfferedServiceID);
router.get('/reviews/service/:id', authenticate, reviewController.getAllReviewsWithServiceID);
router.post('/reviews', validate(reviewCreateSchema), reviewController.createReview);
router.delete('/reviews/:id', authenticate, reviewController.deleteReview);

module.exports = router;