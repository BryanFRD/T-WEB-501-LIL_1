'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ad extends Model {
    static associate(models) {
      Ad.belongsToMany(models.ContractType, {through: 'AdContractType'});
      Ad.belongsTo(models.Company, {constraints: false, foreignKey: 'companyId', as: 'company'})
    }
  }
  Ad.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.ENUM('OPEN', 'CLOSED')
  }, {
    sequelize,
    modelName: 'Ad',
    paranoid: true
  });
  return Ad;
};