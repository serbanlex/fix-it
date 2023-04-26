const serviceRepo = require('../infrastructure/repositories/service.repo');
const { EntityNotFound } = require('../exceptions');

module.exports = {
    async createService(req, res, next) {
        // #swagger.tags = ['Services (general)']
        /*  #swagger.parameters['service'] = {
                in: 'body',
                description: 'Basic information of the service',
                schema: {
                    $name: 'Repairing sinks',
                    $description: 'Careful repair of sinks',
                    $serviceCategoryID: 1
                }
            }
        */
        const serviceInfo = req.body;
        try {
            const service = await serviceRepo.create(serviceInfo);
            res.status(200).json(service);
        }
        catch (error) {
            next(error);
        }
    },

    async getAllServices(req, res, next) {
        // #swagger.tags = ['Services (general)']
        try {
            const services = await serviceRepo.getAll();
            res.status(200).json(services);
        }
        catch (error) {
            next(error);
        }
    },

    async getServiceById(req, res, next) {
        // #swagger.tags = ['Services (general)']
        const id = req.params.id;
        try {
            const service = await serviceRepo.getById(id);
            res.status(200).json(service);
        }
        catch (error) {
            next(error);
        }
    },

    async getServiceOfferersThatOfferService(req, res, next) {
        // #swagger.tags = ['Services (general)']
        const id = req.params.id;
        try {
            const serviceOfferers = await serviceRepo.getServiceOfferersThatOfferService(id);
            res.status(200).json(serviceOfferers);
        }
        catch (error) {
            next(error);
        }
    },

    async updateService(req, res, next) {
        // #swagger.tags = ['Services (general)']
        const id = req.params.id;
        const serviceInfo = req.body;
        try {
            const service = await serviceRepo.update(id, serviceInfo);
            res.status(200).json(service);
        }
        catch (error) {
            next(error);
        }
    },

    async deleteService(req, res, next) {
        // #swagger.tags = ['Services (general)']
        const id = req.params.id;
        try {
            await serviceRepo.deleteById(id);
            const services = await serviceRepo.getAll();
            res.status(200).json(services);
        }
        catch (error) {
            next(error);
        }
    }
}
