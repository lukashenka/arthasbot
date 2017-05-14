import { chatType } from '../selector'

const groupChatsOnly = async (ctx, next) => {
  if (!(chatType(ctx) === 'supergroup' || chatType(ctx) === 'group')) return;
  next();
};

export default groupChatsOnly;