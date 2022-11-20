'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateStart: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      isPrivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      expiredDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      previewId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'static_field', key: 'id' },
      },
      createdByUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  },
};
