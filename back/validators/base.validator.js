const Joi = require('joi');

class BaseValidator {
  
  #findByPk = Joi.object({
    id: Joi.string().uuid().required()
  }).required();
  
  validateFindByPk = (data, options) => {
    return this.validate(this.#findByPk, data, options);
  }
  
  validate = (schema, data, options = {stripUnknown: true, abortEarly: false}) => {
    const response = schema.validate(data, options);
    
    if(response.error){
      response.error.details = response.error.details[0].context?.details?.map(({context, message}) => ({key: context.key, message}));
    }
    
    return response;
  }
  
}

module.exports = BaseValidator;