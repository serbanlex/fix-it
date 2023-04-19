const Joi = require('joi');
const userBaseCreate = require('./userCreate')

module.exports = userBaseCreate.keys(
    {
        firmName: Joi.string().required(),
        firmCity: Joi.string().required(),
        firmAddress: Joi.string().required(),
        CUI: Joi.string().regex(/^RO[0-9]{8}$/).required(),
        CAEN: Joi.string().length(4).required(),
    }
)

