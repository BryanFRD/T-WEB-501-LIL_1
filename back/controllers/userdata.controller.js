const BaseController = require('./base.controller');
const UserDataValidator = require('../validators/userdata.validator');
const { Op } = require('sequelize');

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
  
  update = (req, res) => {
    console.log('dsqdqs', req.user)
    if(req.user?.isAdmin || req.user?.id === req.params.id){
      if(!req.datas.password || req.datas.password === '')
        delete req.datas.password;
      
      return super.update(req, res);
    }
    
    return res.status(401).json({success: false, message: 'Unauthorized'});
  }
  
}

module.exports = UserDataController;