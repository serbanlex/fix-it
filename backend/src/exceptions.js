class FixItError extends Error {
    constructor(message, statusCode) {
        console.log(message);
        super(message);
        this.statusCode = statusCode;
    }
}

class EntityNotFound extends FixItError {
    constructor(message) {
        super(message, 404);
    }
}

class EntityAlreadyExists extends FixItError {
    constructor(message) {
        super(message, 409);
    }
}

class InvalidCredentials extends FixItError {
    constructor(message) {
        super(message, 401);
    }
}

module.exports = {
    FixItError,
    EntityNotFound,
    EntityAlreadyExists,
    InvalidCredentials
}