import CommonModel from 'business-chat-backend/model/CommonModel';
import schema from './schema/message';

export default class Message extends CommonModel {
  constructor({ validateRoomId }) {
    super({
      collectionName: 'messages',
      schema,
      validators: {
        roomId: validateRoomId,
      },
    });
  }
}
