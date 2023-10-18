const BaseController = require('./base.controller');
const CompanyValidator = require('../validators/company.validator');
const { Op } = require('sequelize');

class CompanyController extends BaseController {
  
  constructor(){
    super('Company', new CompanyValidator());
  }
  
  findAll (req, res) {
    const response = this.validator.validateFindAll(req.datas);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findAndCountAll({
      where: {
        name: {[Op.like]: `%${data?.search ?? ''}%`},
      },
      paranoid: !data.deleted,
    })
      .then((data) => res.status(200).json({success: true, models: data.rows, total: data.count}))
      .catch((err) => {
        res.status(400).json({success: false, message: err.message})
      });
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

module.exports = CompanyController;