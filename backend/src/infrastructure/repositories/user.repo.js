const { EntityAlreadyExists, EntityNotFound } = require('../../exceptions');
const { User } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require("bcrypt");
const { deleteById } = require('./client.repo');

class UserRepository {
    async create(userInfo) {
        // userInfo.password = await bcrypt.hash(userInfo.password, 10);
        const credentialsInUse = await this.credentialsInUse(userInfo.email, userInfo.phoneNumber);
        if (credentialsInUse) {
            throw new EntityAlreadyExists('User with that email or phone number already exists');
        }
        try {
            return await User.create(userInfo);
        } catch (error) {
            throw new Error('Failed to create user. Reason: ' + error);
        }
    }

    async getAll() {
        return await User.findAll({ include: ['clientInfo', 'serviceOffererInfo'], exclude: ['ID'] });
    }

    async getById(id) {
        const user = await User.findByPk(id, {
            include: [
                { model: Client, as: 'clientInfo', exclude: ['ID', 'createdAt', 'updatedAt'] },
                { model: ServiceOfferer, as: 'serviceOffererInfo', exclude: ['ID', 'createdAt', 'updatedAt'] }
            ],
        });
        if (!user) {
            throw new EntityNotFound('User not found');
        }
        return user;
    }

    async deleteById(id) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new EntityNotFound('User not found');
        }
        return await user.destroy();
    }

    async credentialsInUse(email, phone) {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { phoneNumber: phone },
                ],
            },
        });
        console.log(user);
        return !!user;
    }

}

module.exports = new UserRepository();
