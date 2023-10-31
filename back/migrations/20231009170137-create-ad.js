'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ads', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      wages: {
        type: Sequelize.STRING,
        allowNull: false
      },
      place: {
        type: Sequelize.STRING,
        allowNull: false
      },
      workingTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'OPEN',
        allowNull: false
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: false
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
    
    await queryInterface.addConstraint('Ads', {
      type: 'foreign key',
      fields: ['companyId'],
      name: 'fk_ads_company',
      references: {
        table: 'Companies',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ads');
  }
};