const config = require('./index');

module.exports = {
  development: {
    url: config.db.url,
    dialect: 'postgresql',
  },
  test: {
    url: config.db.url,
    dialect: 'postgresql',
  },
  production: {
    url: config.db.url,
    dialect: 'postgresql',
  },
