const BaseController = require('./base.controller');
const ApplierValidator = require('../validators/applier.validator');

class ApplierController extends BaseController {
  
  constructor(){
    super('Applier', new ApplierValidator());
  }
  
}

module.exports = ApplierController;