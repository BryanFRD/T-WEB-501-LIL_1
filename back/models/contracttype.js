'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractType extends Model {
    static associate(models) {
      ContractType.belongsToMany(models.Ad, {through: 'AdContractType'});
    }
  }
  ContractType.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ContractType',
  });
  return ContractType;
};