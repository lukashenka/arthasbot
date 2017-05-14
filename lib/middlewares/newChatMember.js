import config from '../config'
import messages from '../messages';

const newChatMember = async (ctx, next) => {
  if (ctx.message && ctx.message.new_chat_member) {
    const newChatMemberId = ctx.message.new_chat_member.id;

    if (newChatMemberId === config.bot.id) {
      ctx.reply(messages.service.bot_joined_group());
    } else {
      ctx.reply(messages.service.someone_joined_group({ user: ctx.message.new_chat_member }));
    }
  }
  next();
};

export default newChatMember;