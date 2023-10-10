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
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ContractType',
  });
  return ContractType;
};