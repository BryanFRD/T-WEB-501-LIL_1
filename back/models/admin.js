'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      
    }
  }
  Admin.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
    paranoid: true
  });
  return Admin;
};