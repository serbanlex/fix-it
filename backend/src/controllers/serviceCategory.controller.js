const ServiceCategoryRepo = require('../infrastructure/repositories/serviceCategory.repo');
const { FixItError } = require('../exceptions');

module.exports = {
    async getAllServiceCategories(req, res, next) {
        // #swagger.tags = ['ServiceCategories']
        try {
            const serviceCategoryData = await ServiceCategoryRepo.getAll();
            res.status(200).json(serviceCategoryData);
        } catch (error) {
            next(error);
        }
    },
    async getServiceCategoryById(req, res, next) {
        // #swagger.tags = ['ServiceCategories']
        try {
            const serviceCategoryData = await ServiceCategoryRepo.getById(req.params.id);
            res.status(200).json(serviceCategoryData);
        } catch (error) {
            next(error);
        }
    },
    async createServiceCategory(req, res, next) {
        // #swagger.tags = ['ServiceCategories']
        /*  #swagger.parameters['serviceCategory'] = {
                in: 'body',
                description: 'Basic information of the service category',
                schema: {
                    $name: 'Plumbing',
                    $imageUrl: 'https://www.fixit.com/images/plumbing.png'
                }
            }
        */
        try {
            const serviceCategoryData = await ServiceCategoryRepo.create(req.body);
            res.status(200).json(serviceCategoryData);
        }
        catch (error) {
            next(error);
        }
    },
    async deleteServiceCategory(req, res, next) {
        // #swagger.tags = ['ServiceCategories']
        try {
            remainingCategories = await ServiceCategoryRepo.delete(req.params.id);
            res.status(200).json(remainingCategories);
        } catch (error) {
            next(error);
        }
    },
    async getServicesBelongingToCategory(req, res, next) {
        // #swagger.tags = ['ServiceCategories']
        try {
            const serviceCategoryData = await ServiceCategoryRepo.getServicesBelongingToCategory(req.params.id);
            res.status(200).json(serviceCategoryData);
        } catch (error) {
            next(error);
        }
    }
};

