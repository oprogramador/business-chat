import JSONSchema from 'jsonschema';
import NonExistentForeignKeyError from 'business-chat-backend/errors/NonExistentForeignKeyError';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import { db } from 'business-chat-backend/servicesManager';
import schema from './schema/room';

const privates = Symbol('privates');

export default class Room {
  constructor({ validateTeamId }) {
    this[privates] = {};
    this[privates].validateTeamId = validateTeamId;
  }

  find(id) {
    return db.collection('rooms').firstExample({ id });
  }

  save(object) {
    if (JSONSchema.validate(object, schema).errors.length > 0) {
      return Promise.reject(new ValidationError());
    }

    return this[privates].validateTeamId(object.teamId)
      .catch(() => Promise.reject(new NonExistentForeignKeyError({ key: 'teamId', value: object.teamId })))
      .then(() => db.collection('rooms').save(object));
  }
}
