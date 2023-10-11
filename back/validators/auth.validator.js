const Joi = require('joi');
const BaseValidator = require('./base.validator');

class AuthValidator extends BaseValidator {
  
  #register = Joi.alternatives(
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      phonenumber: Joi.string().required(),
      description: Joi.string().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
    }).required(),
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      phonenumber: Joi.string().required(),
      description: Joi.string().required(),
      name: Joi.string().required(),
    }).required(),
  );
  
  validateRegister = (data, options) => {
    return this.validate(this.#register, data, options);
  }
  
}

module.exports = AuthValidator;