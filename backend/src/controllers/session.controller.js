const createSession = require('../services/session/create.session');
const { FixItError } = require('../exceptions');

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
            console.log(await createSession(email, password))
            res.status(200).cookie('session', token, { httpOnly: true, sameSite: 'strict' }).json(loggedInUser);
        }
        catch (error) {
            if (error instanceof FixItError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
};