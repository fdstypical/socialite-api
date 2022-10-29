'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('place_attachments', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      placeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'places', key: 'id' },
        onDelete: 'CASCADE',
      },
      fileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'static_field', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('place_attachments');
  },
};
