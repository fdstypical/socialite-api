'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          level: 1,
          name: 'user',
          description: 'Simple User',
        },
        {
          level: 2,
          name: 'admin',
          description: 'Site Administrator',
        },
        {
          level: 3,
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
