'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Profiles', 'nickname', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Profiles', 'status', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('Profiles', 'aboutMyself', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('Profiles', 'latitude', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
    await queryInterface.addColumn('Profiles', 'longitude', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
    await queryInterface.addColumn('Profiles', 'customerNeeds', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Profiles', 'nickname');
    await queryInterface.removeColumn('Profiles', 'status');
    await queryInterface.removeColumn('Profiles', 'aboutMyself');
    await queryInterface.removeColumn('Profiles', 'latitude');
    await queryInterface.removeColumn('Profiles', 'longitude');
    await queryInterface.removeColumn('Profiles', 'customerNeeds');
  }
};
