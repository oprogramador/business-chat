import JSONSchema from 'jsonschema';
import NonExistentForeignKeyError from 'business-chat-backend/errors/NonExistentForeignKeyError';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import { db } from 'business-chat-backend/servicesManager';
import schema from './schema/room';
import uuid from 'node-uuid';

const privates = Symbol('privates');
const ARANGO_NOT_FOUND = 404;

export default class Room {
  constructor({ validateTeamId }) {
    this[privates] = {};
    this[privates].validateTeamId = validateTeamId;
  }

  find(id) {
    return db.collection('rooms').firstExample({ id });
  }

  exists(id) {
    return db.collection('rooms').firstExample({ id })
      .then(() => true)
      .catch(error => (error.errorNum === ARANGO_NOT_FOUND ? false : Promise.reject(error)));
  }

  save(object) {
    if (JSONSchema.validate(object, schema).errors.length > 0) {
      return Promise.reject(new ValidationError());
    }
    const objectToSave = Object.assign({}, object, { id: uuid.v4() });

    return this[privates].validateTeamId(object.teamId)
      .catch(() => Promise.reject(new NonExistentForeignKeyError({ key: 'teamId', value: object.teamId })))
      .then(() => db.collection('rooms').save(objectToSave))
      .then(() => objectToSave);
  }
}
