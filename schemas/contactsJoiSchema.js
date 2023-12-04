const Joi = require("joi");

const contactsJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

module.exports = contactsJoiSchema;
