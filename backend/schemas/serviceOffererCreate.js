const userBaseCreate = require('./userBaseCreate')

const serviceOffererCreate = userBaseCreate.keys(
    {
        firmName: Joi.string().required(),
        CUI: Joi.string().required(),
        CAEN: Joi.string().email().required(),
    }
)