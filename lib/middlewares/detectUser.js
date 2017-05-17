import { sender, chatId, senderId } from '../selector'
import UserService from '../services/user.service';
import ChatPayloadService from '../services/chatPayload.service';

const userService = new UserService();
const chatPayloadService = new ChatPayloadService();

const detectUser = async (ctx, next) => {
  const msgSender = sender(ctx);

  await userService.addOrUpdate({
    ...msgSender,
    latestMessage: new Date(),
  });

  await chatPayloadService.initChatPayload({
    ChatId: chatId(ctx),
    UserId: senderId(ctx),
  });

  next();
};

export default detectUser;