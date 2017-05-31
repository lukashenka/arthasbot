module.exports = (sequelize, DataTypes) => {
  const DailyGameLog = sequelize.define('DailyGameLog', {
    selectedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'daily_game_log',
  });
  
  DailyGameLog.prototype.associate = (models) => {
        DailyGameLog.belongsTo(models.User);
      };

  return DailyGameLog;
};
