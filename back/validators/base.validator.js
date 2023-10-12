const Joi = require('joi');

class BaseValidator {
  
  #findByPk = Joi.object({
    id: Joi.string().uuid().required()
  }).required();
  
  #findAll = Joi.object({
    name: Joi.string().uuid(),
    offset: Joi.number().min(0),
    limit: Joi.number().min(1).max(100),
  }).required();
  
  #delete = Joi.object({
    id: Joi.string().uuid().required()
  }).required();
  
  validateFindByPk = (data, options) => {
    return this.validate(this.#findByPk, data, options);
  }
  
  validateFindAll = (data, options) => {
    return this.validate(this.#findAll, data, options);
  }
  
  validateDelete = (data, options) => {
    return this.validate(this.#delete, data, options);
  }
  
  validate = (schema, data, options = {stripUnknown: true, abortEarly: false}) => {
    const response = schema.validate(data, options);
    
    if(response.error){
      response.error.details = response.error?.details?.length > 0 ? response.error.details[0]?.context?.details?.map(({context, message}) => ({key: context.key, message})) : [];
    }
    
    return response;
  }
  
}

module.exports = BaseValidator;