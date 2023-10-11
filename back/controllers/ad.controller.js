const AdValidator = require('../validators/ad.validator');
const BaseController = require('./base.controller');

class AdController extends BaseController {
  
  constructor(){
    super('Ad', new AdValidator());
  }
  
  create = (req, res) => {
    
  }
  
  update = (req, res) => {
    
  }
  
}

module.exports = AdController;