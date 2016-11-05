import CommonModel from 'business-chat-backend/model/CommonModel';
import schema from './schema/room';

const privates = Symbol('privates');

export default class Room extends CommonModel {
  constructor({ validateTeamId }) {
    super({
      collectionName: 'rooms',
      schema,
      validators: {
        teamId: validateTeamId,
      },
    });

    this[privates] = {};
    this[privates].validateTeamId = validateTeamId;
  }
}
