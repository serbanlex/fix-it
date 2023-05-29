const jwt = require('jsonwebtoken');
const { JWTDecodeError } = require('../exceptions');
const getSession = require('../services/session/get.session');

// Mock the jwt.verify function
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}));

// Mock the process.env.JWT_SECRET value
process.env.JWT_SECRET = 'testsecret';

describe('getSession', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should decode the token and return the user information', () => {
        const token = 'testToken';
        const decodedToken = { user: { id: 1, email: 'test@example.com' } };

        // Mock the jwt.verify function to return the decoded token
        jwt.verify.mockReturnValue(decodedToken);

        const result = getSession(token);

        expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
        expect(result).toEqual(decodedToken.user);
    });

    it('should throw a JWTDecodeError if the token is invalid', () => {
        const token = 'invalidToken';

        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        expect(() => getSession(token)).toThrow(JWTDecodeError);
        expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    });
});
