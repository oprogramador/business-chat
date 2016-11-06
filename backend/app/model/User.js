import CommonModel from 'business-chat-backend/model/CommonModel';
import schema from './schema/user';

export default class User extends CommonModel {
  constructor() {
    super({
      collectionName: 'users',
      schema,
    });
  }
}
