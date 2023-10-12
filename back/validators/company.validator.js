const Joi = require('joi');
const BaseValidator = require('./base.validator');

class CompanyValidator extends BaseValidator {
  
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
  }).required();
  
  validateCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
}

module.exports = CompanyValidator;