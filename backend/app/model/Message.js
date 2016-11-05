import JSONSchema from 'jsonschema';
import NonExistentForeignKeyError from 'business-chat-backend/errors/NonExistentForeignKeyError';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import { db } from 'business-chat-backend/servicesManager';
import schema from './schema/message';

const privates = Symbol('privates');

export default class Message {
  constructor({ validateRoomId }) {
    this[privates] = {};
    this[privates].validateRoomId = validateRoomId;
  }

  find(id) {
    return db.collection('messages').firstExample({ id });
  }

  save(object) {
    if (JSONSchema.validate(object, schema).errors.length > 0) {
      return Promise.reject(new ValidationError());
    }

    return this[privates].validateRoomId(object.roomId)
      .catch(() => Promise.reject(new NonExistentForeignKeyError({ key: 'roomId', value: object.roomId })))
      .then(() => db.collection('messages').save(object));
  }
}
