const Joi = require('joi');
const BaseValidator = require('./base.validator');

class AdminValidator extends BaseValidator {
  
  #findUserData = Joi.object({
    id: Joi.string().uuid().required(),
    deleted: Joi.boolean().default(false)
  });
  
  #create = Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    associatedId: Joi.string().uuid(),
  }).required();
  
  #update = Joi.object({
    id: Joi.string().uuid().required(),
    firstname: Joi.string().min(3),
    lastname: Joi.string().min(3),
    name: Joi.string().min(3),
    associatedId: Joi.string().uuid(),
    deleted: Joi.boolean().default(false),
  }).required();
  
  validateFindUserData = (data, options) => {
    return this.validate(this.#findUserData, data, options);
  }
  
  validateCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
}

module.exports = AdminValidator;