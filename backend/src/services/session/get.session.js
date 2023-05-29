// export a function that gets a session jwt, decodes it with the env secret key and returns the user object
// Compare this snippet from src/services/session/get.session.js:
const jwt = require('jsonwebtoken');
const { JWTDecodeError } = require('../../exceptions');

module.exports = (token) => {
    try {
        const jwtInfo = jwt.verify(token, process.env.JWT_SECRET);
        if (!jwtInfo.user) {
            throw new JWTDecodeError("Invalid JWT!");
        }
        return jwtInfo.user;
    }
    catch (error) {
        console.log(`Error decoding jwt: ${error}`)
        throw new JWTDecodeError("Invalid JWT!");
    }
}