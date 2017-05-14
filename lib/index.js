import Telegraf from 'telegraf';
import { karmaChange, getChatTop } from './features/karma';
import { getChatMemberInfo } from './features/common';
import config from './config'
import detectUser from './middlewares/detectUser'
import detectChat from './middlewares/detectChat'
import groupChatsOnly from './middlewares/groupChatsOnly'
import newChatMember from './middlewares/newChatMember'

const bot = new Telegraf(config.bot.token);

bot.use(groupChatsOnly, detectChat, detectUser, newChatMember);

bot.command('start', ctx => ctx.reply('хуярт'));
bot.command('me', getChatMemberInfo);
bot.command('top', getChatTop);
bot.hears(['+', '-', '👍', '👎'], karmaChange);

bot.startPolling();