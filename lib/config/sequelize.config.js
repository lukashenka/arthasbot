const config = require('./index');

module.exports = {
  development: {
    url: config.db.url,
    dialect: 'postgresql',
    ssl:true,
  },
  test: {
    url: config.db.url,
    dialect: 'postgresql',
    ssl:true,
  },
  production: {
    url: config.db.url,
    dialect: 'postgresql',
   "ssl":true,
   "dialectOptions":{
      "ssl":{
         "require":true
      }
   }
  },
};
