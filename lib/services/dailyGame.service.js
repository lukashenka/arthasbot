import models from '../db';

export default class DailyGameService {
  async add({ UserId, ChatId }) {
    return await models.DailyGameLog.upsert({
      ChatId,
      UserId,
      selectedAt: new Date(),
    });
  }

  async getTodayWinner({ ChatId }) {
    const after = new Date();
    after.setHours(0);
    after.setMinutes(0);
    after.setSeconds(0);
    after.setMilliseconds(0);

    const before = new Date(after);
    before.setDate(before.getDate() + 1);

    return await models.DailyGameLog.findOne({
      where: {
        ChatId,
        selectedAt: {
          $gte: after,
          $lt: before
        }
      },
      include: [
        {
          model: models.User,
        }
      ]
    })
  }
}

