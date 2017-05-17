'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const DataTypes = Sequelize.DataTypes;

    return queryInterface
      .renameTable('karma', 'chat_payload')
      .then(() => Promise.all([
        queryInterface.renameColumn('chat_payload', 'value', 'karma'),
        queryInterface.addColumn('chat_payload', 'karmaVisible', {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        }),
        queryInterface.addColumn('chat_payload', 'canChangeKarma', {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        }),
        queryInterface.addColumn('chat_payload', 'latestKarmaVote', {
          type: DataTypes.DATE,
          allowNull: true,
        }),
      ]));
  },

  down: function (queryInterface) {
    return queryInterface
      .renameTable('chat_payload', 'karma')
      .then(() => Promise.all([
        queryInterface.renameColumn('chat_payload', 'karma', 'value'),
        queryInterface.removeColumn('chat_payload', 'karmaVisible'),
        queryInterface.removeColumn('chat_payload', 'canChangeKarma'),
        queryInterface.removeColumn('chat_payload', 'latestKarmaVote'),
      ]));
  }
};
