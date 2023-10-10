'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
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
      },
      associatedId: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};