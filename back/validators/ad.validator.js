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
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    status: Joi.string().min(1).default('Ouvert'),
    contractTypes: Joi.array().items(Joi.string().uuid()).required(),
    companyId: Joi.string().uuid().required(),
    wages: Joi.string().min(1).required(),
    place: Joi.string().min(1).required(),
    workingTime: Joi.string().min(1).required()
  }).required();
  
  #update = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(3),
    status: Joi.string().min(1),
    contractTypes: Joi.array().items(Joi.string().uuid()),
    companyId: Joi.string().uuid(),
    wages: Joi.string().min(1),
    place: Joi.string().min(1),
    workingTime: Joi.string().min(1),
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