const BaseController = require('./base.controller');
const AdminValidator = require('../validators/admin.validator');

class AdminController extends BaseController {
  
  constructor(){
    super('Admin', new AdminValidator());
  }
  
}

module.exports = AdminController;