const { EntityAlreadyExists, EntityNotFound } = require('../../exceptions');
const { User, Client, ServiceOfferer } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require("bcrypt");

class UserRepository {
    async create(userInfo) {
        // userInfo.password = await bcrypt.hash(userInfo.password, 10);
        const credentialsInUse = await this.credentialsInUse(userInfo.email, userInfo.phoneNumber);
        if (credentialsInUse) {
            throw new EntityAlreadyExists('User with that email or phone number already exists');
        }
        userInfo.password = await bcrypt.hash(userInfo.password, 10);
        try {
            return await User.create(userInfo);
        } catch (error) {
            throw new Error('Failed to create user. Reason: ' + error);
        }
    }

    async getAll() {
        return await User.findAll({
            include: [
                { model: Client, as: 'clientInfo', attributes: { exclude: ['ID', 'createdAt', 'updatedAt'] } },
                { model: ServiceOfferer, as: 'serviceOffererInfo', attributes: { exclude: ['ID', 'createdAt', 'updatedAt'] } }
            ],
            attributes: { exclude: ['password'] }
        });
    }

    async getById(id) {
        const user = await User.findByPk(id, {
            include: [
                { model: Client, as: 'clientInfo', attributes: { exclude: ['ID', 'createdAt', 'updatedAt'] } },
                { model: ServiceOfferer, as: 'serviceOffererInfo', attributes: { exclude: ['ID', 'createdAt', 'updatedAt'] } }
            ],
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            throw new EntityNotFound('User not found');
        }
        return user;
    }

    async getByEmail(email) {
        /*
            Returns the user with the given email, along with his client or service offerer info. Returns null if no user is found.
            If the user is a client, the clientInfo field will be populated.
            If the user is a service offerer, the serviceOffererInfo field will be populated.
            CAUTION: this method is used when logging in, so the password field is included.
        */
        const user = await User.findOne({
            where: {
                email: email,
            },
            include: [
                { model: Client, as: 'clientInfo', exclude: ['ID', 'createdAt', 'updatedAt'] },
                { model: ServiceOfferer, as: 'serviceOffererInfo', exclude: ['ID', 'createdAt', 'updatedAt'] }
            ],
        });
        return user
    }

    async deleteById(id) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new EntityNotFound('User not found');
        }
        return await user.destroy();
    }

    async login(email, password) {
        const user = await this.getByEmail(email);
        if (!user || !email || !password) {
            console.log('Login failed: User not found or credentials not provided')
            return false;
        }
        const validCredentials = bcrypt.compareSync(password, user.password);
        if (!validCredentials) {
            return null;
        }
        return this.getById(user.ID);
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
