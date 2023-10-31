'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appliers extends Model {
    static associate(models) {
      Appliers.belongsTo(models.Ad, { foreignKey: 'adId', as: 'ad'});
    }
  }
  Appliers.init({
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
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    adId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Appliers',
    paranoid: true
  });
  return Appliers;
};