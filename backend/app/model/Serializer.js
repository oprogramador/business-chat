import SerializableObject from 'business-chat-backend/model/SerializableObject';
import { db } from 'business-chat-backend/servicesManager';

const privates = Symbol('privates');

export default class Serializer {
  constructor() {
    this[privates] = {
      collectionName: 'all',
    };
  }

  createDatabase(name) {
    db.useDatabase('_system');

    return db.createDatabase(name)
      .then(() => db.useDatabase(name));
  }

  createCollection() {
    return db.collection(this[privates].collectionName).create();
  }

  create(object) {
    const serializableObject = new SerializableObject(object);

    return serializableObject;
  }
}
