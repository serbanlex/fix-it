const { FixItError } = require("../../exceptions");
const { OfferedService, Service, ServiceOfferer } = require("../models");
const { EntityNotFound } = require("../../exceptions");

class OfferedServiceRepository {
    async create(offeredServiceInfo) {
        console.log(offeredServiceInfo);
        try {
            const { serviceOffererID, serviceID, ...rest } = offeredServiceInfo;
            const offeredService = await OfferedService.create(rest);
            await offeredService.setServiceOfferer(serviceOffererID);
            await offeredService.setService(serviceID);
            return offeredService;
        } catch (error) {
            throw new Error("Failed to create offered service. Reason: " + error.message);
        }
    }


    async getById(offeredServiceID) {
        try {
            const offeredService = await OfferedService.findByPk(offeredServiceID);
            if (!offeredService) {
                throw new EntityNotFound(`Offered service with ID ${offeredServiceID} not found`);
            }
            return offeredService;
        }
        catch (error) {
            throw new Error("Failed to find offered service. Reason: " + error.message);
        }
    }

    async getByServiceOffererID(serviceOffererID) {
        try {
            const offeredServices = await OfferedService.findAll({
                where: {
                    ServiceOffererID: serviceOffererID
                }
            });
            return offeredServices;
        }
        catch (error) {
            throw new Error("Failed to find offered services. Reason: " + error.message);
        }
    }

    async getByServiceID(serviceID) {
        try {
            const offeredServices = await OfferedService.findAll({
                where: {
                    ServiceID: serviceID
                }
            });
            return offeredServices;
        }
        catch (error) {
            throw new Error("Failed to find offered services. Reason: " + error.message);
        }
    }

    async getAll() {
        try {
            const offeredServices = await OfferedService.findAll({
                include: [
                    { model: ServiceOfferer },
                    { model: Service },
                ],
            });
            return offeredServices;
        } catch (error) {
            throw new Error("Failed to find offered services. Reason: " + error.message);
        }
    }


    async update(offeredServiceID, offeredServiceDetails) {
        const offeredService = await this.findByID(offeredServiceID);
        try {
            await offeredService.update(offeredServiceDetails);
        }
        catch (error) {
            throw new Error("Failed to update offered service. Reason: " + error.message);
        }
    }

    async delete(offeredServiceID) {
        const offeredService = await this.getById(offeredServiceID);
        try {
            await offeredService.destroy();
        }
        catch (error) {
            throw new Error("Failed to delete offered service. Reason: " + error.message);
        }
        return await this.getAll();
    }
}

module.exports = new OfferedServiceRepository();