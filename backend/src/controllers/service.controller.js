const serviceRepo = require('../repositories/service.repository');
const { EntityNotFound } = require('../exceptions');

module.exports = {
    async createService(req, res) {
        // #swagger.tags = ['Services (general)']
        const serviceInfo = req.body;
        const service = await serviceRepo.create(serviceInfo);
        res.status(201).json(service);
    },

    async getAllServices(req, res) {
        // #swagger.tags = ['Services (general)']
        const services = await serviceRepo.getAll();
        res.status(200).json(services);
    },

    async getServiceById(req, res) {
        // #swagger.tags = ['Services (general)']
        const id = req.params.id;
        const service = await serviceRepo.getById(id);
        res.status(200).json(service);
    },

    async updateService(req, res) {
        // #swagger.tags = ['Services (general)']
        const id = req.params.id;
        const serviceInfo = req.body;
        const service = await serviceRepo.update(id, serviceInfo);
        res.status(200).json(service);
    },

    async deleteService(req, res) {
        // #swagger.tags = ['Services (general)']
        const id = req.params.id;
        await serviceRepo.deleteById(id);
        res.status(204).send();
    }
}
