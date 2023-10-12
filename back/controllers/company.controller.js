const BaseController = require('./base.controller');
const CompanyValidator = require('../validators/company.validator');

class CompanyController extends BaseController {
  
  constructor(){
    super('Company', new CompanyValidator());
  }
  
}

module.exports = CompanyController;