const { FixItError } = require('../../exceptions');

function errorHandler(error, req, res, next) {
    console.log(error);
    if (error instanceof FixItError) {
        // Handle custom application-specific errors
        return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: 'Something went wrong' });
}

module.exports = errorHandler;