require('dotenv').config();

const env = process.env;

module.exports = {
  bot: {
    id: Number(env.BOT_ID),
    token: env.BOT_TOKEN
  },
  db: {
    url: env.CLEARDB_DATABASE_URL,
    log: !!+env.DAD_DB_LOG
  },
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
