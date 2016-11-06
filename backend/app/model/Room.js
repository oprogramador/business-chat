import CommonModel from 'business-chat-backend/model/CommonModel';
import inputSchema from './schema/input/room';

export default class Room extends CommonModel {
  constructor({ validateTeamId }) {
    super({
      collectionName: 'rooms',
      inputSchema,
      validators: {
        teamId: validateTeamId,
      },
    });
  }
}
