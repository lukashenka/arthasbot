import { round, find } from 'lodash';
import models from '../db';

export default class KarmaService {
  async increaseKarma({ UserId, ChatId, amountToAdd }) {
    const found = await models.Karma.findOne({
      where: {
        UserId,
        ChatId
      }
    });

    const updated = await found.update({
      value: round(found.value + amountToAdd, 2)
    });

    return updated.value;
  }

  async initKarma({ UserId, ChatId }) {
    return await models.Karma.upsert({
      ChatId,
      UserId,
    });
  }

  async getTopKarmaByChat({ ChatId, limit, isPlusTop = true }) {
    const value = isPlusTop ? {
      $gt: 0
    } : {
      $lt: 0
    };

    const karmaList = await models.Karma.findAll({
      where: {
        ChatId,
        value,
      },
      limit,
      order: [
        ['value', isPlusTop ? 'DESC' : 'ASC']
      ],
    });
    if (!karmaList || karmaList.length === 0) return [];

    const users = await models.User.findAll({
      where: {
        id: {
          $in: karmaList.map(i => i.UserId)
        }
      }
    });

    if (!users || users.length === 0) return [];

    const plainUsers = users.map(user => user.get({ plain: true }));

    return karmaList.map(item => {
      const plainKarma = item.get({ plain: true });
      return {
        value: plainKarma.value,
        user: find(plainUsers, user => user.id === plainKarma.UserId),
      }
    });
  }
}

