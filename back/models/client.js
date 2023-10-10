'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      
    }
  }
  Client.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
    paranoid: true
  });
  return Client;
};