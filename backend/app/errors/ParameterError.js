import ExtendableError from 'es6-error';

const privates = Symbol('privates');

export default class ParameterError extends ExtendableError {
  constructor({ message, parameterName }) {
    super();
    this[privates] = { message, parameterName };
  }

  getParameterName() {
    return this[privates].parameterName;
  }

  getMessage() {
    return this[privates].message;
  }
}
