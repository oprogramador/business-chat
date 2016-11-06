import CommonModel from 'business-chat-backend/model/CommonModel';
import inputSchema from './schema/input/message';
import outputSchema from './schema/output/message';

export default class Message extends CommonModel {
  constructor({ validateRoomId, validateSenderId }) {
    super({
      collectionName: 'messages',
      inputSchema,
      outputSchema,
      validators: {
        roomId: validateRoomId,
        senderId: validateSenderId,
      },
    });
  }
}
