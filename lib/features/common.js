import UserService from '../services/user.service';
import { chatId, senderId } from '../selector';
import messages from '../messages'

const userService = new UserService();

export const getChatMemberInfo = async (ctx) => {
  const chatMember = await userService.getUser({ id: senderId(ctx), chatId: chatId(ctx)});
  ctx.replyWithMarkdown(messages.common.chatMemberInfo({ chatMember }));
};

export const gitInfo = (ctx) => ctx.reply(messages.common.gitInfo());