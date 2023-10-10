'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    static associate(models) {
      UserData.belongsTo(models.Client, {constraints: false, foreignKey: 'userDataId', as: 'client'});
      UserData.belongsTo(models.Company, {constraints: false, foreignKey: 'userDataId', as: 'company'});
      UserData.belongsTo(models.Admin, {constraints: false, foreignKey: 'userDataId', as: 'admin'});
    }
  }
  UserData.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserData',
    paranoid: true
  });
  return UserData;
};