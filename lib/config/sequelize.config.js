const config = require('./index');

module.exports = {
  development: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.databaseName,
    host: config.db.host,
    dialect: 'postgresql',
  },
  test: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.databaseName,
    host: config.db.host,
    dialect: 'postgresql',
  },
  production: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.databaseName,
    host: config.db.host,
    dialect: 'postgresql',
  },
};