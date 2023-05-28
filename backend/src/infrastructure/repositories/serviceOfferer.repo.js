// Repo for ServiceOfferer, that uses ServiceOfferer model alongside the User model
const { EntityAlreadyExists, EntityNotFound } = require('../../exceptions');
const { ServiceOfferer, User, OfferedService } = require('../models');
const userRepo = require('./user.repo');

class ServiceOffererRepo {
    async create(serviceOffererInfo) {
        let user;
        let serviceOfferer;
        try {
            user = await userRepo.create(serviceOffererInfo);
            serviceOfferer = await ServiceOfferer.create({ "ID": user.ID, ...serviceOffererInfo });
        } catch (error) {
            if (user) {
                userRepo.deleteById(user.ID);
            }
            console.log("Error creating serviceOfferer: " + error);
            throw error;
        }
        return this.getById(serviceOfferer.ID);
    }

    async getById(id) {
        const result = await ServiceOfferer.findByPk(
            id,
            {
                include: [
                    {
                        model: User,
                        required: true,
                        attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] },
                        as: "userInfo"
                    },
                    { model: OfferedService, as: 'offeredServices' }

                ],
            },
        );
        if (!result) {
            throw new EntityNotFound(`ServiceOfferer with ID ${id} not found`);
        }
        return result;

    }

    async getAll() {
        const result = await ServiceOfferer.findAll({
            include: [
                {
                    model: User,
                    required: true,
                    attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] },
                    as: "userInfo"
                },
                { model: OfferedService, as: 'offeredServices' }

            ],
        });
        return result;
    }
}

module.exports = new ServiceOffererRepo();