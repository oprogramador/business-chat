import { db } from 'business-chat-backend/servicesManager';

export default {
  find: id => db.collection('messages').firstExample({ id }),
  save: object => db.collection('messages').save(object),
};
