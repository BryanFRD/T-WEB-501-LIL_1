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
    name: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ContractType',
    paranoid: true
  });
  return ContractType;
};