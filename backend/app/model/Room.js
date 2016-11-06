import CommonModel from 'business-chat-backend/model/CommonModel';
import inputSchema from './schema/input/room';
import outputSchema from './schema/output/room';

export default class Room extends CommonModel {
  constructor({ validateTeamId }) {
    super({
      collectionName: 'rooms',
      inputSchema,
      outputSchema,
      validators: {
        teamId: validateTeamId,
      },
    });
  }
}
