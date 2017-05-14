import models from '../db';
import { chatId, senderId } from '../selector'

const initKarmaInChat = async (ctx, next) => {
  await models.Karma.upsert({
    ChatId: chatId(ctx),
    UserId: senderId(ctx),
  });
  next();
};

export default initKarmaInChat;