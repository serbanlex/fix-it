const {Review, Client, OfferedService, User, ServiceOfferer, Order} = require('../models');
const {EntityNotFound} = require('../../exceptions');

class ReviewRepository {
    async create(reviewInfo) {
        var review = null;
        try {
            review = await Review.create(reviewInfo);
            review.setClient(reviewInfo.clientID);
            review.setOrder(reviewInfo.orderID);
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                console.log(error);
                throw new EntityNotFound(`Review reference(s) not found`);
            }
            try{
                await review.destroy();
            }
            catch(error){
                throw new Error('Failed to delete review. Reason: ' + error);
            }
            throw new Error('Failed to create review. Reason: ' + error);
        }
        return await this.getById(review.ID);
    }

    async deleteById(id) {
        const review = await this.getById(id);
        await review.destroy();
        return this.getAll();
    }

    async getById(id) {
        const foundReview = await Review.findByPk(id, {
            include: [
                {
                    model: Client,
                    include: [
                        {
                            model: User,
                            as: 'userInfo',
                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                        },
                    ],
                },
                {
                    model: Order,
                    include: [
                        {
                            model: OfferedService,
                            include: [
                                {
                                    model: ServiceOfferer,
                                    include: [
                                        {
                                            model: User,
                                            as: 'userInfo',
                                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        if (!foundReview) {
            throw new EntityNotFound('Review with id ' + id + ' not found');
        }
        return foundReview;
    }

    async getAll() {
        return await Review.findAll({
            include: [
                {
                    model: Client,
                    include: [
                        {
                            model: User,
                            as: 'userInfo',
                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                        },
                    ],
                },
                {
                    model: Order,
                    include: [
                        {
                            model: OfferedService,
                            include: [
                                {
                                    model: ServiceOfferer,
                                    include: [
                                        {
                                            model: User,
                                            as: 'userInfo',
                                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }


    async getByOrderId(orderId) {
        return await Review.findAll({
            where: {
                orderID: orderId
            },
            include: [
                {
                    model: Client,
                    include: [
                        {
                            model: User,
                            as: 'userInfo',
                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                        },
                    ],
                },
                {
                    model: Order,
                    include: [
                        {
                            model: OfferedService,
                            include: [
                                {
                                    model: ServiceOfferer,
                                    include: [
                                        {
                                            model: User,
                                            as: 'userInfo',
                                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }

    async getByClientId(clientId) {
        return await Review.findAll({
            where: {
                clientID: clientId
            },
            include: [
                {
                    model: Client,
                    include: [
                        {
                            model: User,
                            as: 'userInfo',
                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                        }
                    ],
                },
                {
                    model: Order,
                    include: [
                        {
                            model: OfferedService,
                            include: [
                                {
                                    model: ServiceOfferer,
                                    include: [
                                        {
                                            model: User,
                                            as: 'userInfo',
                                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }

    async getByOfferedServiceId(offeredServiceId) {
        // TODO: this should be improved, done somehow just with the ORM
        const allReviews = await this.getAll();
        return allReviews.filter(review => review.Order.OfferedServiceID == offeredServiceId);
    }

    async getByServiceId(serviceId) {
        const allReviews = await this.getAll();
        return allReviews.filter(review => review.Order.OfferedService.ServiceID == serviceId);
    }


}

module.exports = new ReviewRepository();