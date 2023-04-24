const { EntityAlreadyExists, EntityNotFound } = require('../../exceptions');
const { ServiceCategory } = require('../models');
const { Service } = require('../models');

class ServiceCategoryRepo {
    async create(serviceCategoryInfo) {
        let serviceCategory;
        try {
            serviceCategory = await ServiceCategory.create(serviceCategoryInfo);
        } catch (error) {
            console.log("Error creating serviceCategory: " + error);
            throw error;
        }
        return serviceCategory;
    }

    async getById(id) {
        const result = await ServiceCategory.findByPk(id);
        if (!result) {
            throw new EntityNotFound(`ServiceCategory with ID ${id} not found`);
        }
        return result;
    }

    async getServicesBelongingToCategory(categoryId) {
        const category = await ServiceCategory.findByPk(categoryId, {
            include: [{
                model: Service,
                as: 'services'
            }]
        });
        if (!category) {
            throw new EntityNotFound(`ServiceCategory with ID ${categoryId} not found`);
        }
        return category.services;
    }

    async getAll() {
        const result = await ServiceCategory.findAll();
        return result;
    }
}

module.exports = new ServiceCategoryRepo();