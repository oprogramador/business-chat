import CommonModel from 'business-chat-backend/model/CommonModel';
import schema from './schema/room';

export default class Room extends CommonModel {
  constructor({ validateTeamId }) {
    super({
      collectionName: 'rooms',
      schema,
      validators: {
        teamId: validateTeamId,
      },
    });
  }
}
