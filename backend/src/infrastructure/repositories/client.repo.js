const { EntityAlreadyExists, EntityNotFound } = require('../../exceptions');
const { Client, User } = require('../models');
const userRepo = require('./user.repo');

class ClientRepository {
    async create(clientInfo) {
        let client;
        let user;
        try {
            user = await userRepo.create(clientInfo);
            client = await Client.create({ "ID": user.ID });
        } catch (error) {
            if (user) {
                userRepo.deleteById(user.ID);
            }
            console.log("Error creating client: " + error);
            throw error;
        }
        return this.getById(client.ID);
    }

    async getById(id) {
        const result = await Client.findByPk(
            id,
            {
                include: [
                    {
                        model: User,
                        required: true,
                        attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] },
                        as: "userInfo"
                    }
                ],
            },
        );
        if (!result) {
            throw new EntityNotFound(`Client with ID ${id} not found`);
        }
        return result;

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
        const client = await Client.findByPk(id);
        if (!client) {
            throw new EntityNotFound('Client not found');
        }
        return await client.destroy();
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
