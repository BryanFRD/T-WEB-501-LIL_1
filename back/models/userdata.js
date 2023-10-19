'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    authenticate(password) {
      return bcrypt.compareSync(password, this.getDataValue('password'));
    }
    static associate(models) {
    }
  }
  UserData.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return "password";
      },
      set(value) {
        console.log('password:', value)
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    },
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserData',
    paranoid: true
  });
  return UserData;
};