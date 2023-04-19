const Joi = require('joi');

const sessionSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = sessionSchema;