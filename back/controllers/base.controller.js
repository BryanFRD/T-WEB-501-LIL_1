const { sequelize } = require('../models');

class BaseController {
  
  constructor(modelName, validator){
    this.modelName = modelName;
    this.model = sequelize.models[modelName];
    this.validator = validator;
    
    this.findByPk = this.findByPk.bind(this);
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.restore = this.restore.bind(this);
  }
  
  findByPk(req, res) {
    const response = this.validator.validateFindByPk(req.datas);
    const data = response?.value;
    
    if(response.error){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(req.params.id, {paranoid: !data.deleted})
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
  
  findAll (req, res) {
    const response = this.validator.validateFindAll(req.datas);
    const data = response?.value;
    
    if(response.error){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findAndCountAll({
      paranoid: !data.deleted,
    })
      .then((data) => res.status(200).json({success: true, models: data.rows, total: data.count}))
      .catch((err) => {
        res.status(400).json({success: false, message: err.message})
      });
  }
  
  create(req, res) {
    const response = this.validator.validateCreate(req.datas);
    const data = response?.value;
    
    if(response.error){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.create(data)
      .then((model) => res.status(201).json({success: true, model}))
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
  update(req, res) {
    const response = this.validator.validateUpdate(req.datas);
    const data = response?.value;
    
    if(response.error){
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
        
        return model.update(data)
          .then((updatedModel) => res.status(200).json({success: true, model: updatedModel}))
          .catch((err) => res.status(400).json({success: false, message: err.message}));
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
  delete(req, res) {
    const response = this.validator.validateDelete(req.datas);
    const data = response?.value;
    
    if(response.error){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(data.id)
      .then((model) => {
        if (!model) {
          return res.status(404).json({
            status: false,
            message: 'Model Not Found',
          });
        }
        
        return this.model.destroy({where: {id: req.params.id}})
          .then(() => res.sendStatus(204))
          .catch((err) => res.status(400).json({success: false, message: err.message}));
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
  restore(req, res) {
    const response = this.validator.validateRestore(req.datas);
    const data = response?.value;
    
    if(response.error){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(data.id, {paranoid: false})
      .then((model) => {
        if (!model) {
          return res.status(404).json({
            status: false,
            message: 'Model Not Found',
          });
        }
        
        return this.model.restore({where: {id: req.params.id}})
          .then(() => res.sendStatus(204))
          .catch((err) => res.status(400).json({success: false, message: err.message}));
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
}

module.exports = BaseController;