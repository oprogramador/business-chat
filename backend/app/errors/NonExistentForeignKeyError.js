import ExtendableError from 'es6-error';

const privates = Symbol('privates');

export default class NonExistentForeignKeyError extends ExtendableError {
  constructor({ key, value }) {
    super();
    this[privates] = { key, value };
  }

  getKey() {
    return this[privates].key;
  }

  getValue() {
    return this[privates].value;
  }
}
