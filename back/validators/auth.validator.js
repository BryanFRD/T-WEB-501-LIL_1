const Joi = require('joi');
const BaseValidator = require('./base.validator');

class AuthValidator extends BaseValidator {
  
  #registerDefault = {
    email: Joi.string().email().required().messages({
      'string.empty': 'Veuillez entrer une adresse email valide',
      'string.email': 'Veuillez entrer une adresse email valide',
    }),
    password: Joi.string().min(3).required().messages({
      'string.empty': 'Veuillez entrer un mot de passe',
      
    }),
    phonenumber: Joi.string().regex(/^(?:0|\+33 ?|0?0?33 ?|)([1-9] ?(?:[0-9] ?){8})$/i).required().messages({
      'string.empty': 'Veuillez entrer un numéro de téléphone valide',
      'string.pattern.base': 'Veuillez entrer un numéro de téléphone valide',
    }),
    description: Joi.string().min(3),
  }
  
  #register = Joi.alternatives(
    Joi.object({
      ...this.#registerDefault,
      firstname: Joi.string().min(3).required().messages({
        'string.empty': 'Veuillez entrer un prénom',
        'string.min': 'Veuillez entrer un prénom valide',
      }),
      lastname: Joi.string().min(3).required().messages({
        'string.empty': 'Veuillez entrer un nom',
        'string.min': 'Veuillez entrer un nom valide',
      }),
    }).required(),
    Joi.object({
      ...this.#registerDefault,
      name: Joi.string().min(3).required().messages({
        'string.empty': 'Veuillez entrer un nom d\'entreprise',
        'string.min': 'Veuillez entrer un nom d\'entreprise valide',
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