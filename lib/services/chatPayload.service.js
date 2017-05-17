import { round, find } from 'lodash';
import models from '../db';

export default class ChatPayloadService {
  async initChatPayload({ UserId, ChatId }) {
    return await models.ChatPayload.upsert({
      ChatId,
      UserId,
    });
  }

  // Karma
  async increaseKarma({ UserId, ChatId, voterUserID, amountToAdd }) {
    const found = await models.ChatPayload.findOne({
      where: {
        UserId,
        ChatId,
      }
    });

    const updated = await found.update({
      karma: round(found.karma + amountToAdd, 2),
    });

    await models.ChatPayload.upsert({
      UserId: voterUserID,
      ChatId,
      latestKarmaVote: new Date(),
    });

    return updated.karma;
  }

  async getTopKarmaByChat({ ChatId, limit, isPlusTop = true }) {
    const karma = isPlusTop ? {
      $gt: 0
    } : {
      $lt: 0
    };

    const karmaList = await models.ChatPayload.findAll({
      where: {
        ChatId,
        karma,
      },
      limit,
      order: [
        ['karma', isPlusTop ? 'DESC' : 'ASC']
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
        value: plainKarma.karma,
        user: find(plainUsers, user => user.id === plainKarma.UserId),
      }
    });
  }
}

