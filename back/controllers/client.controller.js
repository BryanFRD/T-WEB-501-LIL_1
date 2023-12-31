const BaseController = require('./base.controller');
const ClientValidator = require('../validators/client.validator');
const { Op } = require('sequelize');

class ClientController extends BaseController {
  
  constructor(){
    super('Client', new ClientValidator());
  }
  
  findAll (req, res) {
    const response = this.validator.validateFindAll(req.datas);
    const data = response?.value;
    
    if(response.error){
      return res.status(400).json({success: false, message: response.error});
    }
    
    this.model.findAndCountAll({
      where: {
        [Op.or]: [
          {firstname: {[Op.like]: `%${data?.search ?? ''}%`}},
          {lastname: {[Op.like]: `%${data?.search ?? ''}%`}},
        ]
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
    
    if(response.error){
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

module.exports = ClientController;