export const sender = ctx => ctx.message.from;
export const senderId = ctx => ctx.message.from.id;

export const chat = ctx => ctx.message.chat;
export const chatId = ctx => ctx.message.chat.id;
export const chatType = ctx => ctx.message.chat.type;

export const userFullName = user => {
  if (user.username) return '@' + user.username;
  if (user.first_name && user.last_name) return user.first_name + ' ' + user.last_name;
  return user.first_name;
};