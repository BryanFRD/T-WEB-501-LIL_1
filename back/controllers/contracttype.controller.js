const BaseController = require('./base.controller');
const ContractTypeValidator = require('../validators/contracttype.validator');
const { Op } = require('sequelize');

class ContractTypeController extends BaseController {
  
  constructor(){
    super('ContractType', new ContractTypeValidator());
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
  
}

module.exports = ContractTypeController;