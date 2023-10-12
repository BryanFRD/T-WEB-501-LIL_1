const Joi = require('joi');
const BaseValidator = require('./base.validator');

class AuthValidator extends BaseValidator {
  
  #register = Joi.alternatives(
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      phonenumber: Joi.string(),
      description: Joi.string(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
    }).required(),
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      phonenumber: Joi.string(),
      description: Joi.string(),
      name: Joi.string().required(),
    }).required(),
  ).required();
  
  #login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
  
  validateRegister = (data, options) => {
    return this.validate(this.#register, data, options);
  }
  
  validateLogin = (data, options) => {
    return this.validate(this.#login, data, options);
  }
  
}

module.exports = AuthValidator;