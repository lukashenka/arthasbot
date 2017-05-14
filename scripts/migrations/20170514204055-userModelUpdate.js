'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'last_name', { type: Sequelize.STRING });
  },

  down: function (queryInterface) {
    return queryInterface.queryInterface.removeColumn('users', 'last_name');
  }
};
