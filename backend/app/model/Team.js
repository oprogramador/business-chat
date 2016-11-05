import CommonModel from 'business-chat-backend/model/CommonModel';
import schema from './schema/team';

export default class Team extends CommonModel {
  constructor() {
    super({
      collectionName: 'teams',
      schema,
    });
  }
}
