'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ad extends Model {
    static associate(models) {
      Ad.belongsToMany(models.ContractType, {through: 'AdContractType'});
      Ad.belongsTo(models.Company, {constraints: false, foreignKey: 'companyId', as: 'company'});
    }
  }
  Ad.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('OPEN', 'CLOSED'),
      defaultValue: 'OPEN',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Ad',
    paranoid: true
  });
  return Ad;
};