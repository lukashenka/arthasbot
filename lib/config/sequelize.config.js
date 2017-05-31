const config = require('./index');

module.exports = {
  development: {
    dbUrl: config.dbUrl,
  },
  test: {
    dbUrl: config.dbUrl,
  },
  production: {
    dbUrl: config.dbUrl,
  },
};
