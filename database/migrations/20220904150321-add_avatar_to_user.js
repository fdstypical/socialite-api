'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'avatarId', {
      type: Sequelize.INTEGER,
      defaultValue: null,
      references: {
        model: 'static_field',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'avatarId');
  },
};
