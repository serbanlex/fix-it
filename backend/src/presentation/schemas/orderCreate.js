const Joi = require('joi');

module.exports = Joi.object({
    offeredServiceID: Joi.number().integer().required(),
    clientID: Joi.number().integer().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    state: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required()
});