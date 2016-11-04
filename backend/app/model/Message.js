import JSONSchema from 'jsonschema';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import { db } from 'business-chat-backend/servicesManager';
import schema from './schema/message';

export default {
  find: id => db.collection('messages').firstExample({ id }),
  save: (object) => {
    if (JSONSchema.validate(object, schema).errors.length > 0) {
      return Promise.reject(new ValidationError());
    }

    return db.collection('messages').save(object);
  },
};
