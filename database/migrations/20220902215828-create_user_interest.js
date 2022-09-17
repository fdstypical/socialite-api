'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_interests', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      interestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'interests', key: 'id' },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_interests');
  },
};
