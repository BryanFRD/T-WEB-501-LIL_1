const Joi = require('joi');
const BaseValidator = require('./base.validator');

class ApplierValidator extends BaseValidator {
  
  #findAd = Joi.object({
    id: Joi.string().uuid().required(),
    deleted: Joi.boolean().default(false),
  }).required();
  
  #create = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    phonenumber: Joi.string().regex(/^(?:0|\+33?|0?0?33?|)([1-9]?(?:[0-9]?){8})$/).required(),
    adId: Joi.string().uuid().required(),
  }).required();
  
  #findByEmail = Joi.object({
    email: Joi.string().email().required(),
    deleted: Joi.boolean().default(false),
  }).required();
  
  #update = Joi.object({
    id: Joi.string().uuid().required(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    phonenumber: Joi.string().regex(/^(?:0|\+33 ?|0?0?33 ?|)([1-9] ?(?:[0-9] ?){8})$/i),
    deleted: Joi.boolean().default(false),
  }).required();
  
  validateFindAd = (data, options) => {
    return this.validate(this.#findAd, data, options);
  }
  
  validateFindByEmail = (data, options) => {
    return this.validate(this.#findByEmail, data, options);
  }
  
  validateCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
}

module.exports = ApplierValidator;