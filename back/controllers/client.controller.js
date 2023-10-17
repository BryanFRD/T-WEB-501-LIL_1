const BaseController = require('./base.controller');
const ClientValidator = require('../validators/client.validator');

class ClientController extends BaseController {
  
  constructor(){
    super('Client', new ClientValidator());
  }
  
  findUserData = (req, res) => {
    const response = this.validator.validateFindUserData(req.datas);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(data.id, {
      paranoid: !data.deleted,
    })
      .then(async (model) => {
        res.status(200).json({success: true, model: await model?.getUserData()})
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}))
  }
  
}

module.exports = ClientController;