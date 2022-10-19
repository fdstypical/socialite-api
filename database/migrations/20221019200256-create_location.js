'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      administrativeArea: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thoroughfare: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      premise: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      lat: {
        type: Sequelize.FLOAT(10),
        allowNull: false,
      },
      lng: {
        type: Sequelize.FLOAT(10),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
  },
};

