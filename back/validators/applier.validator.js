const Joi = require('joi');
const BaseValidator = require('./base.validator');

class ApplierValidator extends BaseValidator {
  
  #create = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    phonenumber: Joi.string().required(),
    adId: Joi.string().uuid().required(),
  }).required();
  
  #update = Joi.object({
    id: Joi.string().uuid().required(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    phonenumber: Joi.string(),
  }).required();
  
  valideCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
}

module.exports = ApplierValidator;