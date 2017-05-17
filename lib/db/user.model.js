module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    latestMessage: {
      type: DataTypes.DATE
    }
  }, {
    freezeTableName: true,
    tableName: 'users',
    classMethods: {
      associate: (models) => {
        User.belongsToMany(models.Chat, {
          through: models.ChatPayload,
        });
      },
    },
  });

  return User;
};

