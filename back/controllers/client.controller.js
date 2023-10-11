const BaseController = require('./base.controller');
const ClientValidator = require('../validators/client.validator');

class ClientController extends BaseController {
  
  constructor(){
    super('Client', new ClientValidator());
  }
  
  create = (req, res) => {
    
  }
  
  update = (req, res) => {
    
  }
  
}

module.exports = ClientController;