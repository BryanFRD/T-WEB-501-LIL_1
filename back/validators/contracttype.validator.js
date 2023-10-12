const Joi = require('joi');
const BaseValidator = require('./base.validator');

class ContractTypeValidator extends BaseValidator {
  
  #create = Joi.object({
    name: Joi.string().required(),
  }).required();
  
  #update = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string(),
  }).required();
  
}

module.exports = ContractTypeValidator;