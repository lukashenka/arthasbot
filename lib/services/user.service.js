import models from '../db'


export default class UserService {
  async getUser({ id, chatId = null }) {
    const query = {
      where: { id },
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
    const found = await models.User.findOne(query);
    return found;
  }
}

