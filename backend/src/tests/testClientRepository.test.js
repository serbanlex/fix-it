const ClientRepository = require('../infrastructure/repositories/client.repo');
const { Client, User } = require('../infrastructure/models');

// Mock the userRepo
const userRepo = {
  create: jest.fn().mockImplementation(async (clientInfo) => {
    // Simulate successful user creation
    return { ID: 1, ...clientInfo };
  }),
  deleteById: jest.fn().mockImplementation(async (userID) => {
    // Simulate successful user deletion
    return true;
  }),
};

// Mock the Client model
jest.mock('../infrastructure/models', () => ({
  Client: {
    create: jest.fn().mockImplementation(async (clientData) => {
      // Simulate successful client creation
      return { ID: 1, ...clientData };
    }),
    findByPk: jest.fn().mockImplementation(async (id) => {
      // Simulate retrieving a client by ID
      if (id === 1) {
        return { ID: 1, name: 'Test Client' };
      } else {
        return null; // Simulate not finding the client
      }
    }),
  },
  User: {
    init: jest.fn(),
  },
}));

describe('ClientRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new client and return it', async () => {
      // Arrange
      const clientInfo = { name: 'Test Client' };

      // Act
      const result = await ClientRepository.create(clientInfo);

      // Assert
      expect(userRepo.create).toHaveBeenCalledTimes(1);
      expect(Client.create).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();
      expect(result.ID).toBe(1);
      expect(result.name).toBe('Test Client');
    });

    it('should throw an error and delete the user if an exception occurs during creation', async () => {
      // Arrange
      const errorMessage = 'User creation failed';
      userRepo.create.mockRejectedValue(new Error(errorMessage));
      const clientInfo = { name: 'Test Client' };

      // Act & Assert
      await expect(ClientRepository.create(clientInfo)).rejects.toThrow(errorMessage);
      expect(userRepo.deleteById).toHaveBeenCalledTimes(1);
    });
  });
});
