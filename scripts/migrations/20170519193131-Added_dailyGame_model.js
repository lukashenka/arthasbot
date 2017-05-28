'use strict';

const tableName = 'daily_game_log';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable(tableName, {
        id: {
          type: DataTypes.INTEGER,
          unique: true,
          primaryKey: true,
        },
        selectedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        }
      }, {
        timestamps: false,
      })
      .then(() => Promise.all([
        queryInterface.addColumn(tableName, 'ChatId', {
          type: Sequelize.DataTypes.STRING,
        }),
        queryInterface.addColumn(tableName, 'UserId', {
          type: Sequelize.DataTypes.INTEGER,
        })
      ]))
      .then(() => Promise.all([
        queryInterface.sequelize.query('ALTER TABLE ONLY "' + tableName + '" ADD CONSTRAINT "'+  tableName +'_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL;'),
        queryInterface.sequelize.query('ALTER TABLE ONLY "' + tableName + '" ADD CONSTRAINT "'+  tableName +'_ChatId_fkey" FOREIGN KEY ("ChatId") REFERENCES chats(id) ON UPDATE CASCADE ON DELETE SET NULL;'),
      ]));
  },

  down: function (queryInterface) {
    return queryInterface.dropTable(tableName);
  }
};
