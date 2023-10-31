const Joi = require('joi');

class BaseValidator {
  
  #findByPk = Joi.object({
    id: Joi.string().uuid().required(),
    deleted: Joi.boolean().default(false)
  }).required();
  
  #findAll = Joi.object({
    search: Joi.string().min(0),
    offset: Joi.number().min(0).default(0),
    limit: Joi.number().min(1).max(100).default(50),
    place: Joi.string().min(0),
    deleted: Joi.boolean().default(false)
  }).required();
  
  #delete = Joi.object({
    id: Joi.string().uuid().required()
  }).required();
  
  #restore = Joi.object({
    id: Joi.string().uuid().required()
  });
  
  validateFindByPk = (data, options) => {
    return this.validate(this.#findByPk, data, options);
  }
  
  validateFindAll = (data, options) => {
    return this.validate(this.#findAll, data, options);
  }
  
  validateDelete = (data, options) => {
    return this.validate(this.#delete, data, options);
  }
  
  validateRestore = (data, options) => {
    return this.validate(this.#restore, data, options);
  }
  
  validate = (schema, data, options = {stripUnknown: true, abortEarly: false}) => {
    
    const response = schema.validate(data, options);
    
    if(response.error){
      response.error.details = response.error?.details?.length > 0 ? response.error.details[0]?.context?.details?.map(({context, message, type}) => ({key: context.key, message, type})) : [];
    }
    
    return response;
  }
  
}

module.exports = BaseValidator;