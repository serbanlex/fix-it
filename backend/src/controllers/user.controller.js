const userRepo = require('../infrastructure/repositories/user.repo');
const { FixItError } = require('../exceptions');

module.exports = {
    async getAllUsers(req, res, next) {
        // #swagger.tags = ['Users']
        try {
            const userData = await userRepo.getAll();
            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    },

    async getUserById(req, res, next) {
        // #swagger.tags = ['Users']
        try {
            const userData = await userRepo.getById(req.params.id);
            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    },

    async deleteUser(req, res, next) {
        // #swagger.tags = ['Users']
        try {
            const { id } = req.params;
            const user = await userRepo.deleteById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },


    async editUser(req, res, next) {
        // #swagger.tags = ['Users']
        /*  #swagger.parameters['user'] = {
                in: 'body',
                description: 'The core information of the user, that can be changed',
                schema: {
                    $email: 'offerer@email.com',
                    $phoneNumber: '0772-456-789',
                    $password: 'user',
                }
            }
         */
        try {
            console.log(req.body);
            const userData = await userRepo.editById(req.params.id, req.body);
            res.status(200).json(userData);
        }
        catch (error) {
            next(error);
        }

    }
};
