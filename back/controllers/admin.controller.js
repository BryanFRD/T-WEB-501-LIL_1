const BaseController = require('./base.controller');
const AdminValidator = require('../validators/admin.validator');

class AdminController extends BaseController {
  
  constructor(){
    super('Admin', new AdminValidator());
  }
  
  isAdmin = (req, res) => {
    return res.status(200).json({success: true, message: 'Admin'});
  }
  
}

module.exports = AdminController;