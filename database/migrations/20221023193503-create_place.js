'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('places', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'locations', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdByUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('places');
  },
};
