'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    async authenticate(password) {
      return await bcrypt.compare(password, process.env.PASSWORD_PREFIX + this.password);
    }
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
        this.setDataValue('password', bcrypt.hashSync(value, 10).replace(process.env.PASSWORD_PREFIX, ''));
      }
    }
  }, {
    sequelize,
    modelName: 'UserData',
    paranoid: true
  });
  return UserData;
};