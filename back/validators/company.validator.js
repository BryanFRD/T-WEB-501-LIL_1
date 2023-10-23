const Joi = require('joi');
const BaseValidator = require('./base.validator');

class CompanyValidator extends BaseValidator {
  
  #findsUserData = Joi.object({
    id: Joi.string().uuid().required(),
    deleted: Joi.boolean().default(false),
  }).required();
  
  #findAds = Joi.object({
    id: Joi.string().uuid().required(),
    deleted: Joi.boolean().default(false)
  }).required();
  
  #create = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3),
    phonenumber: Joi.string().regex(/^(?:0|\+33 ?|0?0?33 ?|)([1-9] ?(?:[0-9] ?){8})$/i).required(),
    associatedId: Joi.string().uuid(),
  }).required();
  
  #update = Joi.object({
    name: Joi.string().min(3),
    description: Joi.string().min(3),
    phonenumber: Joi.string().regex(/^(?:0|\+33 ?|0?0?33 ?|)([1-9] ?(?:[0-9] ?){8})$/i),
    associatedId: Joi.string().uuid(),
    deleted: Joi.boolean().default(false),
  }).required();
  
  validateFindUserData = (data, options) => {
    return this.validate(this.#findsUserData, data, options);
  }
  
  validateFindAds = (data, options) => {
    return this.validate(this.#findAds, data, options);
  }
  
  validateCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
}

module.exports = CompanyValidator;