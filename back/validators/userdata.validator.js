const Joi = require('joi');
const BaseValidator = require('./base.validator');

class UserDataValidator extends BaseValidator {
  
  #create = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    validated: Joi.boolean().default(false),
  }).required();
  
  #update = Joi.object({
    id: Joi.string().uuid().required(),
    email: Joi.string().email(),
    password: Joi.string(),
    validated: Joi.boolean().default(false),
    deleted: Joi.boolean().default(false),
  }).required();
  
  validateCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
}

module.exports = UserDataValidator;