const Joi = require('joi');

module.exports = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().required(),
    imageUrl: Joi.string().required(),
    clientID: Joi.number().integer().required(),
    orderID: Joi.number().integer().required()
});