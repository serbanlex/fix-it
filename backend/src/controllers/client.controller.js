const clientRepo = require('../infrastructure/repositories/client.repo');
const { FixItError } = require('../exceptions');

module.exports = {
    async getAllClients(req, res, next) {
        // #swagger.tags = ['Clients']
        try {
            const userData = await clientRepo.getAll();
            res.status(200).json(userData);
        } catch (error) {
            if (error instanceof FixItError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    async getClientById(req, res, next) {
        // #swagger.tags = ['Clients']
        try {
            const userData = await clientRepo.getById(req.params.id);
            res.status(200).json(userData);
        } catch (error) {
            if (error instanceof FixItError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    async createClient(req, res) {
        /*  #swagger.parameters['client'] = {
                    in: 'body',
                    description: 'Basic user details of the client',
                    schema: {
                        $firstName: 'Jhon',
                        $lastName: 'Doe',
                        $email: 'bla@bla.com',
                        $phoneNumber: '0773-456-789',
                        $password: '123456',
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
                if (error instanceof FixItError) {
                    res.status(error.statusCode).json({ error: error.message });
                }
                console.log(error);
                res.status(500).json({ error: error.message });
            });
    },
};
