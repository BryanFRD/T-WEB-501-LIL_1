const { sequelize } = require('../models');

class BaseController {
  
  constructor(modelName){
    this.model = sequelize.models[modelName];
  }
  
  findByPk = (req, res) => {
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
    this.model.findAll()
      .then((models) => res.status(200).json({success: true, models}))
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
  delete = (req, res) => {
    this.model.findByPk(req.params.id)
      .then((model) => {
        if (!model) {
          return res.status(404).json({
            status: false,
            message: 'Model Not Found',
          });
        }
        return model.destroy()
          .then(() => res.status(204).json({success: true}))
          .catch((err) => res.status(400).json({success: false, message: err.message}));
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
}

module.exports = BaseController;