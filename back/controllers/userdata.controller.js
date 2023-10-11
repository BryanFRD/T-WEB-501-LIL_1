const BaseController = require('./base.controller');
const UserDataValidator = require('../validators/userdata.validator');

class UserDataController extends BaseController {
  
  constructor(){
    super('UserData', new UserDataValidator());
  }
  
  create = (req, res) => {
    
  }
  
  update = (req, res) => {
    
  }
  
}

module.exports = UserDataController;