import CommonModel from 'business-chat-backend/model/CommonModel';
import inputSchema from './schema/input/user';
import outputSchema from './schema/output/user';

export default class User extends CommonModel {
  constructor() {
    super({
      collectionName: 'users',
      inputSchema,
      outputSchema,
    });
  }
}
