'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Ad);
    }
  }
  Company.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    phonenumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
    paranoid: true
  });
  return Company;
};