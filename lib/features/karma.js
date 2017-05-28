import { round } from 'lodash'

import config from '../config';
import UserService from '../services/user.service';
import ChatPayloadService from '../services/chatPayload.service';
import { chatId, senderId } from '../selector';
import { karma, canChangeKarma, karmaBlockExist, latestKarmaVote } from '../selector/user.service.selector';
import messages from '../messages'

const userService = new UserService();
const chatPayloadService = new ChatPayloadService();

const karmaPlus = 'karmaPlus';
const karmaMinus = 'karmaMinus';

const parseType = text => {
  switch (text) {
    case '+': return karmaPlus;
    case '👍': return karmaPlus;
    case 'ПЛЮС БЛЯТЬ': return karmaPlus;
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
  if (targetId === config.bot.id) return ctx.replyWithMarkdown(messages.karma.voter_try_to_change_bot_karma());

  const voter = await userService.getUser({ id: voterId, chatId: chatId(ctx)});

  // check for vote-ban (voter check)
  if (canChangeKarma(voter) === false) {
    return ctx.reply(messages.karma.voter_have_karma_ban());
  }

  // check for timeout (voter check)
  const latestVoteDate = latestKarmaVote(voter);
  if (latestVoteDate) {
    const now = new Date();
    const nextAllowedDate = new Date(latestVoteDate);
    nextAllowedDate.setSeconds(nextAllowedDate.getSeconds() + config.features.karma.nextVoteTimeoutInSeconds);
    if (nextAllowedDate > now) {
      return ctx.reply(messages.karma.too_many_votes());
    }
  }

  // check for negative karma value (voter check)
  const voterKarma = karma(voter);
  if (voterKarma < 0) {
    return ctx.reply(messages.karma.no_vote_voter_karma_nevagative({ voterKarma }));
  }

  let target = await userService.getUser({ id: targetId, chatId: chatId(ctx)});
  if (!target) {
    await userService.addOrUpdate({
      ...msg.reply_to_message.from,
    });

    await chatPayloadService.initChatPayload({
      ChatId: chatId(ctx),
      UserId: targetId,
    });

    target = await userService.getUser({ id: targetId, chatId: chatId(ctx)});
  }
  if (karmaBlockExist(target) === true) {
    return ctx.reply(messages.karma.target_have_karma_ban({ user: target }));
  }

  const toIncrement = calculateScoreToChange(karmaChangeType, (voterKarma === 0) ? 1 : voterKarma);

  const targetNewKarma = await chatPayloadService.increaseKarma({
    UserId: targetId,
    ChatId: chatId(ctx),
    amountToAdd: toIncrement,
    voterUserID: voterId,
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
  const top = await chatPayloadService.getTopKarmaByChat({
    ChatId: chatId(ctx),
    limit: config.features.karma.top_amount,
  });
  return ctx.replyWithMarkdown(messages.karma.top_karma_users({ top }));
};

export const getChatMinusTop = async (ctx) => {
  const top = await chatPayloadService.getTopKarmaByChat({
    ChatId: chatId(ctx),
    limit: config.features.karma.top_amount,
    isPlusTop: false
  });
  return ctx.replyWithMarkdown(messages.karma.top_minus_karma_users({ top }));
};