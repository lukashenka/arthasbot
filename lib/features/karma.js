import { round } from 'lodash'

import config from '../config';
import UserService from '../services/user.service';
import KarmaService from '../services/karma.service';
import { chatId, senderId } from '../selector';
import { karma } from '../selector/user.service.selector';
import messages from '../messages'

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

  if (targetId === voterId) return ctx.reply(messages.karma.no_vote_yourself());

  const voter = await userService.getUser({ id: voterId, chatId: chatId(ctx)});
  const voterKarma = karma(voter);
  if (voterKarma < 0) return ctx.reply(messages.karma.no_vote_voter_karma_nevagative({ voterKarma }));

  let target = await userService.getUser({ id: targetId, chatId: chatId(ctx)});
  if (!target) {

    await userService.addOrUpdate({
      ...msg.reply_to_message.from,
    });

    await karmaService.initKarma({
      ChatId: chatId(ctx),
      UserId: targetId,
    });

    target = await userService.getUser({ id: targetId, chatId: chatId(ctx)});
  }

  const toIncrement = calculateScoreToChange(karmaChangeType, (voterKarma === 0) ? 1 : voterKarma);

  const targetNewKarma = await karmaService.increaseKarma({
    UserId: targetId,
    ChatId: chatId(ctx),
    amountToAdd: toIncrement,
  });


  switch (karmaChangeType) {
    case karmaPlus: return ctx.reply(messages.karma.voter_increased_karma_to_target({
      voter,
      voterKarma,
      target,
      targetNewKarma
    }));
    case karmaMinus: return ctx.reply(messages.karma.voter_decreased_karma_to_target({
      voter,
      voterKarma,
      target,
      targetNewKarma
    }));
  }


};

export const getChatTop = async (ctx) => {
  const top = await karmaService.getTopKarmaByChat({
    ChatId: chatId(ctx),
    limit: config.features.karma.top_amount,
  });
  return ctx.replyWithMarkdown(messages.karma.top_karma_users({ top }));
};