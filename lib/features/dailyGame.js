import DailyGameService from '../services/dailyGame.service';
import ChatPayloadService from '../services/chatPayload.service';
import { chatId } from '../selector';
import messages from '../messages'

const dailyGameService = new DailyGameService();
const chatPayloadService = new ChatPayloadService();

export const runDailyGame = async (ctx) => {
  const ChatId = chatId(ctx);
  const foundSelectee = await dailyGameService.getTodayWinner({ ChatId });
  if (foundSelectee) {
    return ctx.reply(messages.dailyGame.already_selected({ user: foundSelectee.User }));
  }

  const selectee = await chatPayloadService.pickRandomUser({ ChatId });

  await dailyGameService.add({
    UserId: selectee.id,
    ChatId
  });

  return ctx.reply(messages.dailyGame.just_selected({ user: selectee }));
};