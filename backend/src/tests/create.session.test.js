const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { InvalidCredentials } = require('../exceptions');
const userRepo = require('../infrastructure/repositories/user.repo');
const createSession = require('../services/session/create.session');

// Mock the userRepo.login function
jest.mock('../infrastructure/repositories/user.repo', () => ({
    login: jest.fn()
}));

// Mock the bcrypt.compareSync function
jest.mock('bcryptjs', () => ({
    compareSync: jest.fn()
}));

// Mock the jwt.sign function
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}));

// Mock the process.env.JWT_SECRET value
process.env.JWT_SECRET = 'testsecret';

describe('createSession', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new session and return token and logged in user', async () => {
        const email = 'test@example.com';
        const password = 'testPassword';
        const loggedInUser = { id: 1, email: 'test@example.com' };

        // Mock the userRepo.login function to return the logged in user
        userRepo.login.mockResolvedValue(loggedInUser);

        // Mock the jwt.sign function to return a token
        jwt.sign.mockReturnValue('testToken');

        const result = await createSession(email, password);

        expect(userRepo.login).toHaveBeenCalledWith(email, password);
        expect(jwt.sign).toHaveBeenCalledWith(
            { user: loggedInUser },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        expect(result).toEqual({ token: 'testToken', loggedInUser });
    });


    it('should throw InvalidCredentials error if login fails', async () => {
        const email = 'test@example.com';
        const password = 'testPassword';

        // Mock the userRepo.login function to return null (login failed)
        userRepo.login.mockResolvedValue(null);

        await expect(createSession(email, password)).rejects.toThrow(InvalidCredentials);
        expect(userRepo.login).toHaveBeenCalledWith(email, password);
        expect(bcrypt.compareSync).not.toHaveBeenCalled();
        expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should throw InvalidCredentials error if password validation fails', async () => {
        const email = 'test@example.com';
        const password = 'testPassword';

        userRepo.login.mockResolvedValue(null);

        await expect(createSession(email, password)).rejects.toThrow(InvalidCredentials);
        expect(userRepo.login).toHaveBeenCalledWith(email, password);
        expect(jwt.sign).not.toHaveBeenCalled();
    });
});
