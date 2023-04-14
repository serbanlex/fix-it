const { EntityAlreadyExists, EntityNotFound } = require('../exceptions');
const { Client, User } = require('../models');
const userRepo = require('./user.repo');

class ClientRepository {
    async create(clientInfo) {
        let client;
        try {
            const user = await userRepo.create(clientInfo);
            client = await Client.create({ "ID": user.ID });
            client = client.toJSON();
        } catch (error) {
            console.log("Error creating client: " + error);
            throw error;
        }
        return this.getById(client.ID);
    }

    async getById(id) {
        try {
            const result = await Client.findByPk(
                id,
                {
                    include: [
                        {
                            model: User,
                            required: true,
                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt'] },
                            as: "userInfo"
                        }
                    ],
                },
            );
            return result ? result : null;
        }
        catch (error) {
            console.log("Error getting client by id. Reason: " + error);
            throw error;
        }

    }

    async getByEmail(email) {
        const result = await Client.findOne({
            where: { email }
        });
        return result ? result.toJSON() : null;
    }

    async updateById(id, client) {
        const result = await Client.update(client, {
            where: { ID: id },
            returning: true,
        });
        return result[1][0] ? result[1][0].toJSON() : null;
    }

    async deleteById(id) {
        const result = await Client.destroy({
            where: { ID: id },
        });
        return result === 1;
    }

    async getAll() {
        const result = await Client.findAll({
            include: [
                {
                    model: User,
                    required: true,
                    attributes: { exclude: ['ID', 'createdAt', 'updatedAt'] },
                    as: "userInfo"
                }
            ],
        });
        return result.map((client) => client.toJSON());
    }
}

module.exports = new ClientRepository();
