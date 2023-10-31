'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdContractTypes', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      adId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      contractTypeId: {
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
    
    await queryInterface.addConstraint('AdContractTypes', {
      type: 'foreign key',
      fields: ['contractTypeId'],
      name: 'fk_adcontracttypes_contract',
      references: {
        table: 'ContractTypes',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    
    await queryInterface.addConstraint('AdContractTypes', {
      type: 'foreign key',
      fields: ['adId'],
      name: 'fk_adcontracttypes_ad',
      references: {
        table: 'Ads',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AdContractTypes');
  }
};