module.exports = (sequelize, DataTypes) => {
  const Karma = sequelize.define('Karma', {
    value: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
    }
  }, {
    freezeTableName: true,
    tableName: 'karma',
  });

  return Karma;
};

