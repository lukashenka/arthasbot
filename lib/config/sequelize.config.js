const config = require('./index');

module.exports = {
  development: {
    url: config.db.url,
    dialect: 'mysql',
    ssl:true,
  },
  test: {
    url: config.db.url,
    dialect: 'mysql',
    ssl:true,
  },
  production: {
    url: config.db.url,
    dialect: 'mysql',
   "ssl":true,
   "dialectOptions":{
      "ssl":{
         "require":true
      }
   }
  },
};
