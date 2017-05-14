import { round } from 'lodash'
import models from '../db'

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
}

