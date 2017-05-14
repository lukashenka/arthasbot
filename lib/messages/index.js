import { userFullName } from '../selector'

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
};

export const service = {
  bot_joined_group: function() {
    return 'Пошумим блять!';
  },
  someone_joined_group: function ({ user }) {
    return 'Привет, ' + userFullName(user) + '! Какой рейт на Upwork? Какой дошик любишь?';
  }
};

export default {
  karma,
  service
}