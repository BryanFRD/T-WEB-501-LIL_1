const BaseController = require('./base.controller');
const CompanyValidator = require('../validators/company.validator');

class CompanyController extends BaseController {
  
  constructor(){
    super('Company', new CompanyValidator());
  }
  
  create = (req, res) => {
    
  }
  
  update = (req, res) => {
    
  }
  
}

module.exports = CompanyController;