const BaseController = require('./base.controller');
const UserDataValidator = require('../validators/userdata.validator');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

class UserDataController extends BaseController {
  
  constructor(){
    super('UserData', new UserDataValidator());
  }
  
  findByPk = (req, res) => {
    if(req.user?.isAdmin || req.user?.id === req.params.id){
      return super.findByPk(req, res);
    }
    
    return res.status(401).json({success: false, message: 'Unauthorized'});
  }
  
  findAll (req, res) {
    const response = this.validator.validateFindAll(req.datas);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findAndCountAll({
      where: {
        email: {[Op.like]: `%${data?.search ?? ''}%`},
      },
      paranoid: !data.deleted,
    })
      .then((data) => res.status(200).json({success: true, models: data.rows, total: data.count}))
      .catch((err) => {
        res.status(400).json({success: false, message: err.message})
      });
  }
  
  update(req, res) {
    const response = this.validator.validateUpdate(req.datas);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(data.id, {paranoid: !data.deleted,})
      .then((model) => {
        if (!model) {
          return res.status(404).json({
            status: false,
            message: 'Model Not Found',
          });
        }
      
        if(!req.user.isAdmin){
          if(!model.authenticate(data.password) && !data.newPassword){
            return res.status(401).json({success: false, message: 'Unauthorized'});
          }
        } else {
          if(!req.datas.password || req.datas.password === '')
            delete req.datas.password;
        }
        
        data.password = data.newPassword;
        return model.update(data)
          .then((updatedModel) => {
            const token = jwt.sign({id: updatedModel.id, updatedAt: updatedModel.updatedAt}, process.env.TOKEN, {expiresIn: 86400});
            
            if(req.user.isAdmin)
              setCookies(res, token);
            
            return res.status(200).json({success: true, model: updatedModel});
          })
          .catch((err) => res.status(400).json({success: false, message: err.message}));
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
}

module.exports = UserDataController;