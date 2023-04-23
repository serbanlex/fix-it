
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../../exceptions');

module.exports = (req, res, next) => {
    const token = req.cookies.session;
    if (!token) {
        throw new Unauthorized('No authorization token provided');
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, { maxAge: '12h' });
        next();
    } catch (err) {
        console.log("Invalid token. Error: ", err.message);
        throw new Unauthorized('Invalid token');
    }
};