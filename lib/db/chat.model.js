module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    latestMessage: {
      type: DataTypes.DATE
    }
  }, {
    freezeTableName: true,
    tableName: 'chats',
    classMethods: {
      associate: (models) => {
        Chat.belongsToMany(models.User, {
          through: models.Karma,
        });
      },
    },
  });

  return Chat;
};

