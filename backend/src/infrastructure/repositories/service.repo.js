const { Op } = require('sequelize');
const { FixItError } = require("../../exceptions");
const { Service, ServiceCategory, ServiceOfferer } = require("../models");
const { EntityNotFound } = require("../../exceptions");

class ServiceRepository {
    async create(serviceInfo) {
        try {
            return await Service.create(serviceInfo);
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new EntityNotFound(`ServiceCategory with ID ${serviceInfo.serviceCategoryID} not found`);
            }
            throw new Error('Failed to create service. Reason: ' + error);
        }
    }

    async getAll() {
        return await Service.findAll({
            include: [{
                model: ServiceCategory,
                as: 'category'
            }]
        });
    }

    async getById(id) {
        const service = await Service.findByPk(id);
        if (!service) {
            throw new EntityNotFound('Service not found');
        }
        return service;
    }

    async update(id, serviceInfo) {
        const service = await this.getById(id);
        try {
            return await service.update(serviceInfo);
        } catch (error) {
            throw new Error('Failed to update service. Reason: ' + error);
        }
    }

    async deleteById(id) {
        const service = await this.getById(id);
        try {
            await service.destroy();
        } catch (error) {
            throw new Error('Failed to delete service. Reason: ' + error);
        }
    }
}

module.exports = new ServiceRepository();
