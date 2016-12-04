import InvalidInstanceError from 'business-chat-backend/errors/InvalidInstanceError';
import Room from 'business-chat-backend/model/Room';
import User from 'business-chat-backend/model/User';
import ValidationError from 'business-chat-backend/errors/ValidationError';

export default class Message {
  constructor({ room, sender, text }) {
    this.validate({ room, sender, text });
    this.room = room;
    this.sender = sender;
    this.text = text;
    this.createdAt = Date.now();

    room.addMessage(this);
  }

  validate({ room, sender, text }) {
    if (!(room instanceof Room)) {
      throw new InvalidInstanceError();
    }
    if (!(sender instanceof User)) {
      throw new InvalidInstanceError();
    }
    if (typeof text !== 'strin') {
      throw new ValidationError();
    }
  }

  getText() {
    return this.text;
  }

  getSender() {
    return this.sender;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getRoom() {
    return this.room;
  }
}
