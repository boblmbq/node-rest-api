const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const usersJoiSchema = {
  registerSchema,
  loginSchema,
};

 module.exports = usersJoiSchema