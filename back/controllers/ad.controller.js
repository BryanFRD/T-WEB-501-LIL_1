const { sequelize } = require('../models');
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
  
  create(req, res) {
    const response = this.validator.validateCreate(req.datas);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.create(data)
      .then((model) => {
        if(!model){
          return res.status(404).json({
            status: false,
            message: 'Model Not Found',
          });
        }
        
        sequelize.models.ContractType.findAll({
          where: {
            id: data.contractTypes,
          },
          paranoid: false,
        })
          .then((models) => {
            if(!models){
              return res.status(404).json({
                status: false,
                message: 'Contract Types Not Found',
              });
            }
            
            model.setContractTypes(models);
            
            return res.status(200).json({success: true, model});
          });
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
  update(req, res) {
    const response = this.validator.validateUpdate(req.datas);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(req.params.id, {paranoid: !data.deleted,})
      .then((model) => {
        if (!model) {
          return res.status(404).json({
            status: false,
            message: 'Model Not Found',
          });
        }
        
        sequelize.models.ContractType.findAll({
          where: {
            id: data.contractTypes,
          },
          paranoid: false,
        })
          .then((models) => {
            if(!models){
              return res.status(404).json({
                status: false,
                message: 'Contract Types Not Found',
              });
            }
            
            model.setContractTypes(models);
            
            return model.update(data)
              .then((updatedModel) => res.status(200).json({success: true, model: updatedModel}))
              .catch((err) => res.status(400).json({success: false, message: err.message}));
          });
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
}

module.exports = AdController;