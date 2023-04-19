const ServiceOffererRepo = require('../infrastructure/repositories/serviceOfferer.repo');
const { FixItError } = require('../exceptions');

module.exports = {
    async getAllServiceOfferers(req, res, next) {
        // #swagger.tags = ['ServiceOfferers']
        try {
            const serviceOffererData = await ServiceOffererRepo.getAll();
            res.status(200).json(serviceOffererData);
        } catch (error) {
            if (error instanceof FixItError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    async getServiceOffererById(req, res, next) {
        // #swagger.tags = ['ServiceOfferers']
        try {
            const serviceOffererData = await ServiceOffererRepo.getById(req.params.id);
            res.status(200).json(serviceOffererData);
        } catch (error) {
            if (error instanceof FixItError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            res.status(500).json({ error: error.message });
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
                    $email: 'some@email.com',
                    $phoneNumber: '0772-456-789',
                    $password: 'user',
                    $firmName: 'FixIt',
                    $firmCity: 'Montreal',
                    $firmAddress: '1234 Main St',
                    $CUI: 'RO12345678',
                    $CAEN: '4123'
                }
            } 
          #swagger.tags = ['Clients']
        */
        try {
            const serviceOffererData = await ServiceOffererRepo.create(req.body);
            res.status(200).json(serviceOffererData);
        } catch (error) {
            if (error instanceof FixItError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
};
