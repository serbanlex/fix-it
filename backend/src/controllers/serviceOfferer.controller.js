const ServiceOffererRepo = require('../infrastructure/repositories/serviceOfferer.repo');
const { FixItError } = require('../exceptions');

module.exports = {
    async getAllServiceOfferers(req, res, next) {
        // #swagger.tags = ['ServiceOfferers']
        try {
            const serviceOffererData = await ServiceOffererRepo.getAll();
            res.status(200).json(serviceOffererData);
        } catch (error) {
            next(error);
        }
    },

    async getServiceOffererById(req, res, next) {
        // #swagger.tags = ['ServiceOfferers']
        try {
            const serviceOffererData = await ServiceOffererRepo.getById(req.params.id);
            res.status(200).json(serviceOffererData);
        } catch (error) {
            next(error);
        }
    },

    async createServiceOfferer(req, res, next) {
        // #swagger.tags = ['ServiceOfferers']
        /*  #swagger.parameters['client'] = {
                in: 'body',
                description: 'Basic user details of the service offerer, including his firm information',
                schema: {
                    $firstName: 'Jhon',
                    $lastName: 'Doe',
                    $email: 'offerer@email.com',
                    $phoneNumber: '0772-456-789',
                    $password: 'user',
                    $firmName: 'FixIt',
                    $firmCity: 'Montreal',
                    $firmAddress: '1234 Main St',
                    $CUI: 'RO12345678',
                    $CAEN: '4123',
                    $imageUrl: 'https://firebasestorage.googleapis.com/v0/b/fix-it-4efd5.appspot.com/o/images%2Fusers%2F39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg?alt=media&token=12d89c90-c039-4ef8-a26a-e908cdcc0890'
                }
            } 
          #swagger.tags = ['Clients']
        */
        try {
            const serviceOffererData = await ServiceOffererRepo.create(req.body);
            res.status(200).json(serviceOffererData);
        } catch (error) {
            next(error);
        }
    },
};
