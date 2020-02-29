'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(255)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      mobile_number: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100)
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      date_of_birth: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING(50)
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};