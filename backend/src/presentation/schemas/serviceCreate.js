const Joi = require('joi');

// validator for the Service model in the database

module.exports = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    serviceCategoryID: Joi.number().required()
});