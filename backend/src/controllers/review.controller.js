const ReviewRepository = require('../infrastructure/repositories/review.repo');

module.exports = {
    async getAllReviews(req, res, next) {
        // #swagger.tags = ['Reviews']
        try {
            const reviewData = await ReviewRepository.getAll();
            res.status(200).json(reviewData);
        } catch (error) {
            next(error);
        }
    },

    async getReviewById(req, res, next) {
        // #swagger.tags = ['Reviews']
        try {
            const reviewData = await ReviewRepository.getById(req.params.id);
            res.status(200).json(reviewData);
        }
        catch (error) {
            next(error);
        }
    },

    async getAllReviewsWithOfferedServiceID(req, res, next) {
        // #swagger.tags = ['Reviews']
        try {
            const reviewData = await ReviewRepository.getByOfferedServiceId(req.params.id);
            res.status(200).json(reviewData);
        }
        catch (error) {
            next(error);
        }
    },

    async createReview(req, res, next) {
        // #swagger.tags = ['Reviews']
        /*  #swagger.parameters['review'] = {
                in: 'body',
                description: 'Basic review details',
                schema: {
                    $rating: 5,
                    $comment: 'This is a comment',
                    $imageUrl: 'https://i.imgur.com/4NZ6uLY.jpeg',
                    $clientID: 1,
                    $offeredServiceID: 1
                }
            }
        */
        try {
            const reviewData = await ReviewRepository.create(req.body);
            res.status(200).json(reviewData);
        }
        catch (error) {
            next(error);
        }
    },

    async deleteReview(req, res, next) {
        // #swagger.tags = ['Reviews']
        try {
            const reviewData = await ReviewRepository.deleteById(req.params.id);
            res.status(200).json(reviewData);
        }
        catch (error) {
            next(error);
        }
    }

}