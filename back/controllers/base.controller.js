const { sequelize } = require('../models');

class BaseController {
  
  constructor(modelName, validator){
    this.modelName = modelName;
    this.model = sequelize.models[modelName];
    this.validator = validator;
  }
  
  findByPk = (req, res) => {
    const response = this.validator.validateFindByPk(req.params);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(req.params.id)
      .then((model) => {
        if (!model) {
          return res.status(404).json({
            status: false,
            message: 'Model Not Found',
          });
        }
        return res.status(200).json({success: true, model});
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
  findAll = (req, res) => {
    const response = this.validator.validateFindAll(req.params);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findAll()
      .then((models) => res.status(200).json({success: true, models}))
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
  create = (req, res) => {
    const response = this.validator.validateCreate({...req.body ?? {}, ...req.params ?? {}});
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.create(data)
      .then((model) => res.status(201).json({success: true, model}))
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
  update = (req, res) => {
    const response = this.validator.validateUpdate({...req.body ?? {}, ...req.params ?? {}});
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(req.params.id)
      .then((model) => {
        if (!model) {
          return res.status(404).json({
            status: false,
            message: 'Model Not Found',
          });
        }
        return model.update(data)
          .then((updatedModel) => res.status(200).json({success: true, model: updatedModel}))
          .catch((err) => res.status(400).json({success: false, message: err.message}));
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
  delete = (req, res) => {
    const response = this.validator.validateDelete(req.params);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(req.params.id)
      .then((model) => {
        if (!model) {
          return res.status(404).json({
            status: false,
            message: 'Model Not Found',
          });
        }
        return model.delete()
          .then(() => res.status(204).json({success: true}))
          .catch((err) => res.status(400).json({success: false, message: err.message}));
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
}

module.exports = BaseController;