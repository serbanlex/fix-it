const { EntityAlreadyExists } = require('../exceptions');
const { User } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require("bcrypt")

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
