import CommonModel from 'business-chat-backend/model/CommonModel';
import inputSchema from './schema/input/team';
import outputSchema from './schema/output/team';

export default class Team extends CommonModel {
  constructor() {
    super({
      collectionName: 'teams',
      inputSchema,
      outputSchema,
    });
  }
}
