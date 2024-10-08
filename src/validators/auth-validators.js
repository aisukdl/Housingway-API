const Joi = require('joi');

const validate = require('./validate');

const registerSchema = Joi.object({
  username: Joi.string().trim().required().messages({
    'any.required': 'username is required',
    'string.empty': 'username is required'
  }),
  email: 
      Joi.string().email({ tlds: false }).messages({
      'any.required': 'email is required'
    }),
  password: Joi.string().alphanum().min(6).required().trim().messages({
    'string.empty': 'password is required',
    'string.alphanum': 'password must contain number or alphabet',
    'string.min': 'password mush have at least 6 characters'
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .trim()
    .messages({
      'any.only': 'password and confirm password did not match',
      'string.empty': 'confirm password is required'
    })
    .strip()
});

exports.validateRegister = validate(registerSchema);

const loginSchema = Joi.object({
  username : Joi.string().required(),
  password: Joi.string().required()
});

exports.validateLogin = validate(loginSchema);
