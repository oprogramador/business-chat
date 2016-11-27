import ValidationError from 'business-chat-backend/errors/ValidationError';

export default class User {
  constructor({ username }) {
    this.validate({ username });
    this.username = username;
  }

  validate({ username }) {
    if (typeof username !== 'string') {
      throw new ValidationError();
    }
    if (username === '') {
      throw new ValidationError();
    }
  }

  getUsername() {
    return this.username;
  }
}
