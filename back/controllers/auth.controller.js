const { sequelize } = require('../models');
const AuthValidator = require('../validators/auth.validator');

class AuthController {
  
  register = (req, res) => {
    const response = new AuthValidator().validateRegister(req.body);
    res.json(response);
  }
  
  login = (req, res) => {
    
  }
  
  logout = (req, res) => {
    
  }
  
  refresh = (req, res) => {
    
  }
  
}

module.exports = AuthController;