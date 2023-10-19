'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.belongsTo(models.UserData, { foreignKey: 'associatedId', as: 'userData'});
      Company.hasMany(models.Ad);
    }
  }
  Company.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING
    },
    phonenumber: {
      type: DataTypes.STRING
    },
    associatedId: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'Company',
    paranoid: true
  });
  return Company;
};