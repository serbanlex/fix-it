const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string().regex(/^[0-9]{4}-[0-9]{3}-[0-9]{3}$/).optional(),
    password: Joi.string().optional(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
});