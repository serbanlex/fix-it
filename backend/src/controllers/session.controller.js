const createSession = require('../services/session/create.session');
const getSession = require('../services/session/get.session');
const { FixItError, InvalidCredentials } = require('../exceptions');

module.exports = {
    async createSession(req, res, next) {
        /*  #swagger.parameters['session'] = {
                in: 'body',
                description: 'Login details of the user that creates the session',
                schema: {
                    $email: 'bla@bla.com',
                    $password: '123456',
                }
            }
            #swagger.tags = ['Sessions']
        */
        try {
            const { email, password } = req.body;
            const { token, loggedInUser } = await createSession(email, password);
            res.status(200).cookie('session', token, { httpOnly: true, sameSite: 'strict' }).json(loggedInUser);
        }
        catch (error) {
            next(error);
        }
    },
    async deleteSession(req, res, next) {
        // #swagger.tags = ['Sessions']
        try {
            res.status(200).clearCookie('session').json({ message: 'Session deleted' });
        }
        catch (error) {
            next(error);
        }
    },
    async getCurrentSesssion(req, res, next) {
        // #swagger.tags = ['Sessions']
        try {
            const token = req.cookies.session;
            if (!token) {
                throw new InvalidCredentials("Missing session cookie");
            }
            decodedToken = getSession(token);
            res.status(200).json(decodedToken);
        }
        catch (error) {
            next(error);
        }
    }
};