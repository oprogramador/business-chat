import CommonModel from 'business-chat-backend/model/CommonModel';
import inputSchema from './schema/input/user';

export default class User extends CommonModel {
  constructor() {
    super({
      collectionName: 'users',
      inputSchema,
    });
  }
}
