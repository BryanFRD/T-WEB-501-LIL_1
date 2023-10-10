const DB = require('../../db/database');
const { DataTypes, Model } = require("sequelize");

class UserDataModel extends Model {}

UserDataModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: DB,
  modelName: 'user_article',
  paranoid: true
});

module.exports = UserDataModel;