import { sender, chatId, senderId } from '../selector'
import UserService from '../services/user.service';
import KarmaService from '../services/karma.service';

const userService = new UserService();
const karmaService = new KarmaService();

const detectUser = async (ctx, next) => {
  const msgSender = sender(ctx);

  await userService.addOrUpdate({
    ...msgSender,
    latestMessage: new Date(),
  });

  await karmaService.initKarma({
    ChatId: chatId(ctx),
    UserId: senderId(ctx),
  });

  next();
};

export default detectUser;