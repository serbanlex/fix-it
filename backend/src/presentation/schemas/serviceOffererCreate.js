const userBaseCreate = require('./userCreate')

module.exports = userBaseCreate.keys(
    {
        firmName: Joi.string().required(),
        CUI: Joi.string().required(),
        CAEN: Joi.string().email().required(),
    }
)