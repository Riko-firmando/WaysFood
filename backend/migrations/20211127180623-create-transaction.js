'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER,
        references:{
          model: "users",
          key: "id"
        },
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
      },
      sellerID: {
        type: Sequelize.INTEGER,
        references:{
          model: "users",
          key: "id"
        },
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};