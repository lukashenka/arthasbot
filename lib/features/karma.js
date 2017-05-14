import { round } from 'lodash'

import config from '../config';
import UserService from '../services/user.service';
import KarmaService from '../services/karma.service';
import { chatId, senderId, userFullName, sender } from '../selector';
import { karma } from '../selector/user.service.selector';

const userService = new UserService();
const karmaService = new KarmaService();

const karmaPlus = 'karmaPlus';
const karmaMinus = 'karmaMinus';

const parseType = text => {
  switch (text) {
    case '+': return karmaPlus;
    case '👍': return karmaPlus;
    case '-': return karmaMinus;
    case '👎': return karmaMinus;
  }
};

const calculateScoreToChange = (action, voterKarma) => {
  const voteScore = Math.pow(voterKarma, 0.5);
  switch (action) {
    case karmaPlus: return round(voteScore , 2);
    case karmaMinus: return round(-1 * voteScore , 2);
    default: return 0;
  }
};

export const karmaChange = async (ctx) => {
  const msg = ctx.message;

  if (!msg.reply_to_message) return;

  const karmaChangeType = parseType(msg.text);
  const voterId = senderId(ctx);
  const targetId = msg.reply_to_message.from.id;

  if (targetId === voterId) return;
  if (targetId === config.bot.id) return;

  const voter = await userService.getUser({ id: voterId, chatId: chatId(ctx)});
  const voterKarma = karma(voter);
  if (voterKarma < 0) return ctx.reply("Sorry, you can't vote while your karma is negative ("+ voterKarma +")");

  const target = await userService.getUser({ id: targetId, chatId: chatId(ctx)});
  if (!target) return ctx.reply('Блять, кто это?!');

  const toIncrement = calculateScoreToChange(karmaChangeType, (voterKarma === 0) ? 1 : voterKarma);

  const newTargetKarma = await karmaService.increaseKarma({
    UserId: targetId,
    ChatId: chatId(ctx),
    amountToAdd: toIncrement,
  });


  switch (karmaChangeType) {
    case karmaPlus: return ctx.reply(userFullName(sender(ctx)) + ' (' + karma(voter) + ') плюсанул в карму ' + userFullName(msg.reply_to_message.from) + ' ('+ newTargetKarma +')');
    case karmaMinus: return ctx.reply(userFullName(sender(ctx)) + ' (' + karma(voter) + ') насрал в карму ' + userFullName(msg.reply_to_message.from) + ' ('+ newTargetKarma +')');
  }


};

export const getKarma = async (ctx) => {
  const result = await userService.getUser({ id: senderId(ctx), chatId: chatId(ctx)});
  const text = "User: " + result.first_name + "\n" +
    "Chat: " + result.Chats[0].title + "\n" +
    "Karma: " + result.Chats[0].Karma.value;
  ctx.reply(text)
}