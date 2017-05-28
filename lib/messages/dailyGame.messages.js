import { userFullName } from '../selector';

export default {
  just_selected: function ({ user }) {
    return 'Ты пидор ' + userFullName(user, true) + '!';
  },
  already_selected: function ({ user }) {
    return 'Согласно моей информации, по результатам сегодняшнего розыгрыша пидор дня - ' + userFullName(user, true) + '!';
  },
};
