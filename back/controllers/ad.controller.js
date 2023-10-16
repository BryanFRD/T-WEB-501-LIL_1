const AdValidator = require('../validators/ad.validator');
const BaseController = require('./base.controller');

class AdController extends BaseController {
  
  constructor(){
    super('Ad', new AdValidator());
  }
  
  findCompany = (req, res) => {
    const response = this.validator.validateFindCompany(req.datas);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(data.id, {
      paranoid: !data.deleted,
    })
      .then(async (model) => {
        res.status(200).json({success: true, model: await model?.getCompany()})
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}))
  }
  
  findContractTypes = (req, res) => {
    const response = this.validator.validateFindContractTypes(req.datas);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(data.id, {
      paranoid: !data.deleted,
    })
      .then(async (model) => {
        res.status(200).json({success: true, models: await model?.getContractTypes()})
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}))
  }
  
}

module.exports = AdController;