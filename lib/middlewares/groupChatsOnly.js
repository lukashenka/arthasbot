import { chatType } from '../selector'

const groupChatsOnly = async (ctx, next) => {
  if (!ctx.message) return;
  if (!(chatType(ctx) === 'supergroup' || chatType(ctx) === 'group')) return;
  next();
};

export default groupChatsOnly;