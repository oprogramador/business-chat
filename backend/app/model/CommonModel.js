import JSONSchema from 'jsonschema';
import NonExistentForeignKeyError from 'business-chat-backend/errors/NonExistentForeignKeyError';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import _ from 'lodash';
import { db } from 'business-chat-backend/servicesManager';
import uuid from 'node-uuid';

const privates = Symbol('privates');
const ARANGO_NOT_FOUND = 404;

export default class CommonModel {
  constructor({ collectionName, schema, validators }) {
    this[privates] = { collectionName, schema, validators };
  }

  createDatabase(name) {
    db.useDatabase('_system');

    return db.createDatabase(name)
      .then(() => db.useDatabase(name));
  }

  createCollection() {
    return db.collection(this[privates].collectionName).create();
  }

  find(id) {
    return db.collection(this[privates].collectionName).firstExample({ id });
  }

  exists(id) {
    return db.collection(this[privates].collectionName).firstExample({ id })
      .then(() => true)
      .catch(error => (error.errorNum === ARANGO_NOT_FOUND ? false : Promise.reject(error)));
  }

  validate(object) {
    if (JSONSchema.validate(object, this[privates].schema).errors.length > 0) {
      return Promise.reject(new ValidationError());
    }

    return Promise.all(
      _.map(
        this[privates].validators,
        (validate, key) => validate(object[key])
          .catch(() => Promise.reject(new NonExistentForeignKeyError({ key, value: object[key] })))
      )
    );
  }

  save(object) {
    const objectToSave = Object.assign({}, object, { id: uuid.v4() });

    return this.validate(object)
      .then(() => db.collection(this[privates].collectionName).save(objectToSave))
      .then(() => objectToSave);
  }
}
