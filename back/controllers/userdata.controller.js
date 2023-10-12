const BaseController = require('./base.controller');
const UserDataValidator = require('../validators/userdata.validator');

class UserDataController extends BaseController {
  
  constructor(){
    super('UserData', new UserDataValidator());
  }
  
  findByPk = (req, res) => {
    if(!req.user?.id || req.params.id != req.user.id){
      return res.status(401).json({success: false, message: 'Unauthorized'});
    }
    
    return this.findByPkBase(req, res);
  }
  
}

module.exports = UserDataController;