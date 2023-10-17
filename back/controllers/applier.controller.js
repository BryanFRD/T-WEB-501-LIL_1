const BaseController = require('./base.controller');
const ApplierValidator = require('../validators/applier.validator');

class ApplierController extends BaseController {
  
  constructor(){
    super('Appliers', new ApplierValidator());
  }
  
  findAd = (req, res) => {
    const response = this.validator.validateFindAd(req.datas);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findByPk(data.id, {
      paranoid: !data.deleted,
    })
      .then(async (model) => {
        res.status(200).json({success: true, model: await model?.getAd()})
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}))
  }
  
}

module.exports = ApplierController;