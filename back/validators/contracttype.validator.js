const Joi = require('joi');
const BaseValidator = require('./base.validator');

class ContractTypeValidator extends BaseValidator {
  
  #create = Joi.object({
    name: Joi.string().min(3).required(),
  }).required();
  
  #update = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().min(3),
    deleted: Joi.boolean().default(false),
  }).required();
  
  validateCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
}

module.exports = ContractTypeValidator;