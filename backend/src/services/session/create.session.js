const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { InvalidCredentials } = require('../../exceptions');
const userRepo = require('../../infrastructure/repositories/user.repo');

module.exports = async (email, password) => {
    const loggedInUser = await userRepo.login(email, password);
    if (!loggedInUser) {
        throw new InvalidCredentials("Invalid credentials");
    }
    const token = jwt.sign(
        { user: loggedInUser },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );
    return { token, loggedInUser };
};