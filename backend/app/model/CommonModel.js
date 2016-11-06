import JSONSchema from 'jsonschema';
import NonExistentForeignKeyError from 'business-chat-backend/errors/NonExistentForeignKeyError';
import ParameterError from 'business-chat-backend/errors/ParameterError';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import _ from 'lodash';
import { db } from 'business-chat-backend/servicesManager';
import filter from 'json-schema-filter';
import uuid from 'node-uuid';

const privates = Symbol('privates');
const ARANGO_NOT_FOUND = 404;

export default class CommonModel {
  constructor({ collectionName, inputSchema, outputSchema, validators = {} }) {
    if (typeof collectionName !== 'string') {
      throw new ParameterError({ message: 'is not a string', parameterName: 'collectionName' });
    }
    if (typeof inputSchema !== 'object') {
      throw new ParameterError({ message: 'is not an object', parameterName: 'inputSchema' });
    }
    if (typeof outputSchema !== 'object') {
      throw new ParameterError({ message: 'is not an object', parameterName: 'outputSchema' });
    }
    this[privates] = { collectionName, inputSchema, outputSchema, validators };
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
    return db.collection(this[privates].collectionName).firstExample({ id })
      .then(object => filter(this[privates].outputSchema, object));
  }

  exists(id) {
    return db.collection(this[privates].collectionName).firstExample({ id })
      .then(() => true)
      .catch(error => (error.errorNum === ARANGO_NOT_FOUND ? false : Promise.reject(error)));
  }

  validate(object) {
    if (JSONSchema.validate(object, this[privates].inputSchema).errors.length > 0) {
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
