const Joi = require('joi');

class BaseValidator {
  
  validate = (schema, data, options = {stripUnknown: true}) => {
    return schema.validate(data, options);
  }
  
}

module.exports = BaseValidator;