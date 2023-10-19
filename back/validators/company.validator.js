const Joi = require('joi');
const BaseValidator = require('./base.validator');

class CompanyValidator extends BaseValidator {
  
  #findsUserData = Joi.object({
    id: Joi.string().uuid().required(),
    deleted: Joi.boolean().default(false),
  }).required();
  
  #create = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    phonenumber: Joi.string(),
    associatedId: Joi.string().uuid(),
  }).required();
  
  #update = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    phonenumber: Joi.string(),
    associatedId: Joi.string().uuid(),
    deleted: Joi.boolean().default(false),
  }).required();
  
  validateFindUserData = (data, options) => {
    return this.validate(this.#findsUserData, data, options);
  }
  
  validateCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
}

module.exports = CompanyValidator;