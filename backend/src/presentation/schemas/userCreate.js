const Joi = require('joi');

const userSchema = Joi.object({
  ID: Joi.number().integer().positive(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().regex(/^[0-9]{4}-[0-9]{3}-[0-9]{3}$/).required(),
  password: Joi.string().required(),
  imageUrl: Joi.string().uri().optional(),
});

module.exports = userSchema;
