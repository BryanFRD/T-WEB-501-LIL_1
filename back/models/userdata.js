'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    static associate(models) {
      UserData.belongsTo(models.Client, {constraints: false, foreignKey: 'associatedId', as: 'client'});
      UserData.belongsTo(models.Company, {constraints: false, foreignKey: 'associatedId', as: 'company'});
      UserData.belongsTo(models.Admin, {constraints: false, foreignKey: 'associatedId', as: 'admin'});
    }
  }
  UserData.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserData',
    paranoid: true
  });
  return UserData;
};