import models from '../db'


export default class UserService {
  async getUser({ id, chatId = null }) {
    const query = {
      where: { id },
      logging: console.log,
    };
    if (chatId) {
      query.include = [
        {
          model: models.Chat,
          where: {
            id: chatId
          }
        }
      ];
    }
    return await models.User.findOne(query);
  }

  async addOrUpdate(payload) {
    return await models.User.upsert({
      ...payload,
      latestMessage: new Date(),
    });
  }
}

