'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'user',
          description: 'Simple User',
        },
        {
          name: 'admin',
          description: 'Site Administrator',
        },
        {
          name: 'owner',
          description: 'Site Owner',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
