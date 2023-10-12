const BaseController = require('./base.controller');
const UserDataValidator = require('../validators/userdata.validator');

class UserDataController extends BaseController {
  
  constructor(){
    super('UserData', new UserDataValidator());
  }
  
}

module.exports = UserDataController;