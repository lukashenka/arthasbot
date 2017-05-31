import { userFullName } from '../selector';

export default {
  just_selected: function ({ user }) {
    return 'Ты пидор ' + userFullName(user, true) + '!';
  },
  already_selected: function ({ user }) {
    return `Сегодня розыгрыша пидор дня - ${userFullName(user)} (это точно)`;
  },
};
