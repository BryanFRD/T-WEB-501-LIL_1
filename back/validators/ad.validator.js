const Joi = require('joi');
const BaseValidator = require('./base.validator');

class AdValidator extends BaseValidator {
  
  #create = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().default('active'),
    contractType: Joi.array().items(Joi.string()).required(),
    companyId: Joi.string().uuid().required(),
  }).required();
  
  #update = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string(),
    contactType: Joi.array().items(Joi.string()),
  }).required();
  
  validateCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
}

module.exports = AdValidator;