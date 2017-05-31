import Telegraf from 'telegraf';
import { karmaChange, getChatTop, getChatMinusTop } from './features/karma';
import { getChatMemberInfo, gitInfo } from './features/common';
import { runDailyGame } from './features/dailyGame';
import config from './config'
import detectUser from './middlewares/detectUser'
import detectChat from './middlewares/detectChat'
import groupChatsOnly from './middlewares/groupChatsOnly'
import newChatMember from './middlewares/newChatMember'

const bot = new Telegraf(config.bot.token);

bot.use(groupChatsOnly, detectChat, detectUser, newChatMember);

bot.command('start', ctx => ctx.reply('хуярт'));
bot.command('me', getChatMemberInfo);
bot.command('pidor', runDailyGame);
bot.command('top', getChatTop);
bot.command(['anti_top', 'antitop', 'minustop', 'minus_top', 'atop', 'dno', 'bottom'], getChatMinusTop);
bot.command(['about', 'git', 'author'], gitInfo);
bot.hears(['+', '-', '👍', '👎', 'ПЛЮС БЛЯТЬ', 'дякую', 'спс'], karmaChange);

bot.startPolling();
