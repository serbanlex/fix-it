const clientRepo = require('../infrastructure/repositories/client.repo');
const { FixItError } = require('../exceptions');

module.exports = {
    async getAllClients(req, res, next) {
        // #swagger.tags = ['Clients']
        try {
            const userData = await clientRepo.getAll();
            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    },

    async getClientById(req, res, next) {
        // #swagger.tags = ['Clients']
        try {
            const userData = await clientRepo.getById(req.params.id);
            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    },

    async createClient(req, res, next) {
        /*  #swagger.parameters['client'] = {
                in: 'body',
                description: 'Basic user details of the client',
                schema: {
                    $firstName: 'Jhon',
                    $lastName: 'Doe',
                    $email: 'client@email.com',
                    $phoneNumber: '0773-456-789',
                    $password: '123456',
                    $imageUrl: 'https://firebasestorage.googleapis.com/v0/b/fix-it-4efd5.appspot.com/o/images%2Fusers%2F39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg?alt=media&token=12d89c90-c039-4ef8-a26a-e908cdcc0890'
                }
            } 
          #swagger.tags = ['Clients']
            */

        await clientRepo
            .create(req.body)
            .then((client) => {
                res.status(200).json(client);
            })
            .catch((error) => {
                next(error);
            });
    },
};
