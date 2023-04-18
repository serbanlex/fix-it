const userRepo = require('../infrastructure/repositories/user.repo');
const { FixItError } = require('../exceptions');

module.exports = {
    async getAllUsers(req, res, next) {
        // #swagger.tags = ['Users']
        try {
            const userData = await userRepo.getAll();
            res.status(200).json(userData);
        } catch (error) {
            if (error instanceof FixItError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    async getUserById(req, res, next) {
        // #swagger.tags = ['Users']
        try {
            const userData = await userRepo.getById(req.params.id);
            res.status(200).json(userData);
        } catch (error) {
            if (error instanceof FixItError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    async deleteUser(req, res, next) {
        // #swagger.tags = ['Users']
        try {
            const { id } = req.params;
            const user = await userRepo.deleteById(id);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof FixItError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
};
