const Joi = require('joi');
const BaseValidator = require('./base.validator');

class AdValidator extends BaseValidator {
  
  #findCompany = Joi.object({
    id: Joi.string().uuid().required(),
    deleted: Joi.boolean().default(false)
  }).required();
  
  #findContractTypes = Joi.object({
    id: Joi.string().uuid().required(),
    deleted: Joi.boolean().default(false)
  }).required();
  
  #findAppliers = Joi.object({
    id: Joi.string().uuid().required(),
    deleted: Joi.boolean().default(false)
  }).required();
  
  #create = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().default('OPEN'),
    contractTypes: Joi.array().items(Joi.string().uuid()).required(),
    companyId: Joi.string().uuid().required(),
    wages: Joi.string().required(),
    place: Joi.string().required(),
    workingTime: Joi.string().required()
  }).required();
  
  #update = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string(),
    contractTypes: Joi.array(),
    companyId: Joi.string().uuid(),
    wages: Joi.string(),
    place: Joi.string(),
    workingTime: Joi.string(),
    deleted: Joi.boolean().default(false),
  }).required();
  
  validateFindCompany = (data, options) => {
    return this.validate(this.#findCompany, data, options);
  }
  
  validateFindContractTypes = (data, options) => {
    return this.validate(this.#findContractTypes, data, options);
  }
  
  validateFindAppliers = (data, options) => {
    return this.validate(this.#findAppliers, data, options);
  }
  
  validateCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
}

module.exports = AdValidator;