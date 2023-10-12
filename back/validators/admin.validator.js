const Joi = require('joi');
const BaseValidator = require('./base.validator');

class AdminValidator extends BaseValidator {
  
  #create = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    associatedId: Joi.string().uuid(),
  }).required();
  
  #update = Joi.object({
    id: Joi.string().uuid().required(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    associatedId: Joi.string().uuid(),
  }).required();
  
  valideCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
}

module.exports = AdminValidator;