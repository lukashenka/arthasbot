import { forEach } from 'lodash';

import config from '../config';
import { userFullName } from '../selector';

export const karma = {
  no_vote_voter_karma_nevagative: function({ voterKarma }) {
    return 'Ты не можешь голосовать с отрицательной кармой (' + voterKarma + ')';
  },
  no_vote_yourself: function() {
    return 'Давай без кармодрочерства, братан';
  },
  voter_increased_karma_to_target: function({ voter, voterKarma, target, targetNewKarma }) {
    return userFullName(voter) + ' (' + voterKarma + ') плюсанул в карму ' + userFullName(target) + ' ('+ targetNewKarma +')';
  },
  voter_decreased_karma_to_target: function({ voter, voterKarma, target, targetNewKarma }) {
    return userFullName(voter) + ' (' + voterKarma + ') насрал в карму ' + userFullName(target) + ' ('+ targetNewKarma +')';
  },
  voter_try_to_change_bot_karma: function () {
    return 'У меня нет кармы 😖😫';
  },
  top_karma_users: function ({ top }) {
    if (!top || top.length === 0) return 'Ни у кого нет кармы в этом чате';

    const rows = [];
    let index = 0;

    rows.push("🏆 *Карма-Топ*");
    forEach(top, item => rows.push(++index + ') ' + userFullName(item.user) + ' ' + item.value));

    return rows.join("\n")
  },
  top_minus_karma_users: function ({ top }) {
    if (!top || top.length === 0) return 'Ни у кого нет отрицательной кармы в этом чате';

    const rows = [];
    let index = 0;

    rows.push("🏆 *Карма-Лох-Топ*");
    forEach(top, item => rows.push(++index + ') ' + userFullName(item.user) + ' ' + item.value));

    return rows.join("\n")
  }
};

export const service = {
  bot_joined_group: function() {
    return 'Пошумим блять!';
  },
  someone_joined_group: function ({ user }) {
    return 'Привет, ' + userFullName(user) + '! Какой рейт на Upwork? Какой дошик любишь?';
  }
};

export const common = {
  chatMemberInfo: function ({ chatMember }) {
    const rows = [];

    rows.push("User: " + chatMember.first_name);
    if (chatMember.isAdmin === true) rows.push('Admin: *yes*');
    rows.push("Chat: " + chatMember.Chats[0].title);
    rows.push("Karma: " + chatMember.Chats[0].Karma.value);

    return rows.join("\n");
  },
  gitInfo: function () {
    return 'Contribute: ' + config.features.common.git.url + "\n" +
      "Author: " + config.features.common.git.author
  }
};

export default {
  karma,
  service,
  common,
}