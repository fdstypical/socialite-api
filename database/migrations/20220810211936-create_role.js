'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      level: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.ENUM,
        values: ['user', 'admin', 'owner'],
        unique: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('roles'),
        queryInterface.sequelize.query(
          'DROP TYPE IF EXISTS "enum_roles_name";',
        ),
      ]);
    });
  },
};
