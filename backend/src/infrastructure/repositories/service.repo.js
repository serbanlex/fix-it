const { Op } = require('sequelize');
const { FixItError } = require("../../exceptions");
const { Service } = require("../models");
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
        return await Service.findAll();
    }

    async getById(id) {
        const service = await Service.findByPk(id);
        if (!service) {
            throw new EntityNotFound('Service not found');
        }
        return service;
    }

    async getServiceOfferersThatOfferService(serviceId) {
        await this.getById(serviceId);
        try {
            const services = await Service.findByPk(serviceId, {
                include: [{
                    model: ServiceOfferer,
                    as: 'serviceOfferers'
                }]
            });
            return services.serviceOfferers;
        } catch (error) {
            console.log(`Failed to get service offerers that offer service with ID ${serviceId}. Reason: ${error}`);
            throw new FixItError("Failed to get service offerers that offer this service");
        }
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
