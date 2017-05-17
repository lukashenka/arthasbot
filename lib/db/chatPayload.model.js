module.exports = (sequelize, DataTypes) => {
  const ChatPayload = sequelize.define('ChatPayload', {
    karma: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
      allowNull: false,
    },
    karmaVisible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    canChangeKarma: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    latestKarmaVote: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    freezeTableName: true,
    tableName: 'chat_payload',
  });

  return ChatPayload;
};

