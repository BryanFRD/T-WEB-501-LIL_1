const BaseController = require('./base.controller');
const CompanyValidator = require('../validators/company.validator');

class CompanyController extends BaseController {
  
  constructor(){
    super('Company', new CompanyValidator());
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