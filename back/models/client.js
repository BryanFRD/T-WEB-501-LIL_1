'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      Client.belongsTo(models.UserData, { foreignKey: 'associatedId', as: 'userData'});
    }
  }
  Client.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstname: {
      type:DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type:DataTypes.STRING,
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Client',
    paranoid: true
  });
  return Client;
};