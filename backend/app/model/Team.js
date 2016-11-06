import CommonModel from 'business-chat-backend/model/CommonModel';
import inputSchema from './schema/input/team';

export default class Team extends CommonModel {
  constructor() {
    super({
      collectionName: 'teams',
      inputSchema,
    });
  }
}
