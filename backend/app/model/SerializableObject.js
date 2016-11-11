import _ from 'lodash';
import uuid from 'node-uuid';

const privates = Symbol('privates');

export default class SerializableObject {
  constructor(object) {
    this[privates] = {
      innerObject: _.cloneDeep(object),
    };
  }

  save() {
    this.id = this.id || uuid.v4();

    return Promise.resolve(this);
  }

  reload() {
    return Promise.resolve(this);
  }
}
