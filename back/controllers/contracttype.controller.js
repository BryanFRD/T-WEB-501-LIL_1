const BaseController = require('./base.controller');
const ContractTypeValidator = require('../validators/contracttype.validator');

class ContractTypeController extends BaseController {
  
  constructor(){
    super('ContractType', new ContractTypeValidator());
  }
  
}

module.exports = ContractTypeController;