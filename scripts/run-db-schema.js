import models from '../lib/db';

models.sequelize
  .sync({
    force: true,
  })
  .then(() => {
    console.log('Database installed successful');
    process.exit(0)
  });
