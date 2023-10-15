const BaseController = require('./base.controller');
const UserDataValidator = require('../validators/userdata.validator');

class UserDataController extends BaseController {
  
  constructor(){
    super('UserData', new UserDataValidator());
  }
  
  findByPk = (req, res) => {
    if(req.user?.isAdmin || req.user?.id === req.params.id){
      return super.findByPk(req, res);
    }
    
    return res.status(401).json({success: false, message: 'Unauthorized'});
  }
  
}

module.exports = UserDataController;