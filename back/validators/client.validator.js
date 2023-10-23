const Joi = require('joi');
const BaseValidator = require('./base.validator');

class ClientValidator extends BaseValidator {
  
  #findUserData = Joi.object({
    id: Joi.string().uuid().required(),
    deleted: Joi.boolean().default(false)
  });
  
  #create = Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    phonenumber: Joi.string().regex(/^(?:0|\+33 ?|0?0?33 ?|)([1-9] ?(?:[0-9] ?){8})$/i).required(),
    description: Joi.string().min(3),
    associatedId: Joi.string().uuid(),
  }).required();
  
  #update = Joi.object({
    id: Joi.string().uuid().required(),
    firstname: Joi.string().min(3),
    lastname: Joi.string().min(3),
    phonenumber: Joi.string().regex(/^(?:0|\+33 ?|0?0?33 ?|)([1-9] ?(?:[0-9] ?){8})$/i),
    description: Joi.string().min(3),
    associatedId: Joi.string().uuid(),
    deleted: Joi.boolean().default(false),
  }).required();
  
  validateCreate = (data, options) => {
    return this.validate(this.#create, data, options);
  }
  
  validateUpdate = (data, options) => {
    return this.validate(this.#update, data, options);
  }
  
  validateFindUserData = (data, options) => {
    return this.validate(this.#findUserData, data, options);
  }
  
}

module.exports = ClientValidator;