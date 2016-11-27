import ValidationError from 'business-chat-backend/errors/ValidationError';

export default class Room {
  constructor({ name }) {
    this.validate({ name });
    this.name = name;
  }

  validate({ name }) {
    if (typeof name !== 'string' && typeof name !== 'undefined') {
      throw new ValidationError();
    }
    if (name === '') {
      throw new ValidationError();
    }
  }

  getName() {
    return this.name;
  }
}
