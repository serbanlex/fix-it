const {Review, Client, OfferedService, User, ServiceOfferer} = require('../models');
const {EntityNotFound} = require('../../exceptions');

class ReviewRepository {
    async create(reviewInfo) {
        var review = null;
        try {
            review = await Review.create(reviewInfo);
            review.setClient(reviewInfo.clientID);
            review.setOfferedService(reviewInfo.offeredServiceID);
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                console.log(error);
                throw new EntityNotFound(`Review reference(s) not found`);
            }
            throw new Error('Failed to create review. Reason: ' + error);
        }
        return await this.getById(review.ID);
    }

    async deleteById(id) {
        const review = await this.getById(id);
        await review.destroy();
        return review;
    }

    async getById(id) {
        return await Review.findByPk(id, {
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
        });
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
        });
    }


    async getByOfferedServiceId(offeredServiceId) {
        return await Review.findAll({
            where: {
                offeredServiceID: offeredServiceId
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
        });
    }

}

module.exports = new ReviewRepository();