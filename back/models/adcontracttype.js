'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdContractType extends Model {
    static associate(models) {
      
    }
  }
  AdContractType.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    adId: {
      type: DataTypes.UUID
    },
    contractTypeId: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'AdContractType',
  });
  return AdContractType;
};