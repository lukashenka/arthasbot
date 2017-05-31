const config = require('./index');

module.exports = {
  development: {
    url: config.db.url,
    dialect: 'mysql',
  },
  test: {
    url: config.db.url,
    dialect: 'mysql',
  },
  production: {
    url: config.db.url,
    dialect: 'mysql',
};
