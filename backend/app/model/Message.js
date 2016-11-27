import InvalidInstanceError from 'business-chat-backend/errors/InvalidInstanceError';
import User from 'business-chat-backend/model/User';
import ValidationError from 'business-chat-backend/errors/ValidationError';

export default class Message {
  constructor({ sender, text }) {
    this.validate({ sender, text });
    this.sender = sender;
    this.text = text;
  }

  validate({ sender, text }) {
    if (!(sender instanceof User)) {
      throw new InvalidInstanceError();
    }
    if (typeof text !== 'string') {
      throw new ValidationError();
    }
  }

  getText() {
    return this.text;
  }

  getSender() {
    return this.sender;
  }
}
