import models from '../db';
import { chat } from '../selector'

const detectUser = async (ctx, next) => {
  const msgChat = chat(ctx)
  msgChat.id = String(msgChat.id);

  await models.Chat.upsert({
    ...msgChat,
    latestMessage: new Date(),
  });
  next();
};

export default detectUser;