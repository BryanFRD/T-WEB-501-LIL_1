const Joi = require('joi');
const BaseValidator = require('./base.validator');

class AuthValidator extends BaseValidator {
  
  #registerDefault = {
    email: Joi.string().email().required().messages({
      'string.empty': 'Veuillez entrer une adresse email valide',
      'string.email': 'Veuillez entrer une adresse email valide',
    }),
    password: Joi.string().min(5).required().messages({
      'string.empty': 'Veuillez entrer un mot de passe',
      
    }),
    phonenumber: Joi.string().regex(/^(?:0|\+33 ?|0?0?33 ?|)([1-9] ?(?:[0-9] ?){8})$/i).required().messages({
      'string.empty': 'Veuillez entrer un numéro de téléphone valide',
      'string.pattern.base': 'Veuillez entrer un numéro de téléphone valide',
    }),
    description: Joi.string(),
  }
  
  #register = Joi.alternatives(
    Joi.object({
      ...this.#registerDefault,
      firstname: Joi.string().required().messages({
        'string.empty': 'Veuillez entrer un prénom',
      }),
      lastname: Joi.string().required().messages({
        'string.empty': 'Veuillez entrer un nom',
      }),
    }).required(),
    Joi.object({
      ...this.#registerDefault,
      name: Joi.string().required().messages({
        'string.empty': 'Veuillez entrer un nom d\'entreprise',
      }),
    }).required(),
  ).required();
  
  #login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  }).required();
  
  validateRegister = (data, options) => {
    return this.validate(this.#register, data, options)
  }
  
  validateLogin = (data, options) => {
    return this.validate(this.#login, data, options);
  }
  
}

module.exports = AuthValidator;