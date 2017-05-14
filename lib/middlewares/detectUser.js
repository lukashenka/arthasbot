import models from '../db';
import { sender } from '../selector'

const detectUser = async (ctx, next) => {
  const msgSender = sender(ctx);

  await models.User.upsert({
    ...msgSender,
    latestMessage: new Date(),
  });

  next();
};

export default detectUser;