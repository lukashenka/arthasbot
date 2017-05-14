require('dotenv').config();

const env = process.env;

module.exports = {
  bot: {
    id: Number(env.BOT_ID),
    token: env.BOT_TOKEN
  },
  db: {
    host: env.DB_PG_HOST,
    port: env.DB_PG_PORT,
    databaseName: env.DB_PG_NAME,
    username: env.DB_PG_USERNAME,
    password: env.DB_PG_PASSWORD,
    log: !!+env.DAD_DB_LOG,
  },
  features: {
    karma: {
      top_amount: 3,
    }
  }
};