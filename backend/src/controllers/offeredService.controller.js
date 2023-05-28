const offeredServiceRepo = require('../infrastructure/repositories/offeredService.repo');
const { EntityNotFound } = require('../exceptions');

module.exports = {
    async createOfferedService(req, res, next) {
        // #swagger.tags = ['Offered Services']
        /*  #swagger.parameters['offeredService'] = {
                in: 'body',
                description: 'Basic information of the offered service',
                schema: {
                    $serviceOffererID: 1,
                    $serviceID: 1,
                    $price: 100
                }
            }
        */
        const offeredServiceInfo = req.body;
        try {
            const offeredService = await offeredServiceRepo.create(offeredServiceInfo);
            res.status(200).json(offeredService);
        }
        catch (error) {
            next(error);
        }
    },
    async getOfferedService(req, res, next) {
        // #swagger.tags = ['Offered Services']
        try {
            const offeredServiceID = req.params.id;
            const offeredService = await offeredServiceRepo.getById(offeredServiceID);
            res.status(200).json(offeredService);
        }
        catch (error) {
            next(error);
        }
    },
    async getAllOfferedServices(req, res, next) {
        // #swagger.tags = ['Offered Services']
        try {
            const offeredServices = await offeredServiceRepo.getAll();
            res.status(200).json(offeredServices);
        }
        catch (error) {
            next(error);
        }
    },
    async deleteOfferedService(req, res, next) {
        // #swagger.tags = ['Offered Services']
        try {
            const offeredService = await offeredServiceRepo.delete(req.params.id);
            res.status(200).json(offeredService);
        }
        catch (error) {
            next(error);
        }
    }


};