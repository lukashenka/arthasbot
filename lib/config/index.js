require('dotenv').config();

const env = process.env;

module.exports = {
  bot: {
    id: Number(env.BOT_ID),
    token: env.BOT_TOKEN
  },
  db: {
    url: env.DATABASE_URL,
    log: !!+env.DAD_DB_LOG,
  },
  dbUrl:  env.DATABASE_URL,
  features: {
    karma: {
      top_amount: 3,
      nextVoteTimeoutInSeconds: 600,
    },
    common: {
      git: {
        author: "@safonovklim",
        url: "https://github.com/safonovklim/upchatbot",
      }
    }
  },
};
