const Joi = require('joi');

// validator for the OfferedService model in the database

module.exports = Joi.object().keys({
    price: Joi.number().required(),
    serviceID: Joi.number().required(),
    serviceOffererID: Joi.number().required()
});