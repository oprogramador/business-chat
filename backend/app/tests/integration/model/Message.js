import MessageModel from 'business-chat-backend/model/Message';
import NonExistentForeignKeyError from 'business-chat-backend/errors/NonExistentForeignKeyError';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import { db } from 'business-chat-backend/servicesManager';
import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';

const createDefaultMessageModel = () => new MessageModel({
  validateRoomId: roomId => roomId === 'existentRoomId',
});

describe('MessageModel', () => {
  beforeEach('recreate database', () => {
    db.useDatabase('_system');
    const newDatabaseName = `test-${faker.name.firstName()}`;

    return db.createDatabase(newDatabaseName)
      .then(() => db.useDatabase(newDatabaseName))
      .then(() => db.collection('messages').create());
  });

  it('saves and retrieves object when it is valid', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      roomId: 'existentRoomId',
      senderId: 'foo',
      text: 'lorem ipsum',
    };

    return messageModel.save(message)
      .then(result => messageModel.find(result.id))
      .then(result => expect(result).to.containSubset(message));
  });

  it('invalidates when authentication fails');
  it('invalidates when there are missing fields', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      roomId: 'existentRoomId',
      senderId: 'foo',
    };

    return expect(messageModel.save(message)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when there are additional fields', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      foo: 'bar',
      roomId: 'existentRoomId',
      senderId: 'foo',
      text: 'lorem ipsum',
    };

    return expect(messageModel.save(message)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when provided room id does not exist', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      roomId: 'nonExistentRoomId',
      senderId: 'foo',
      text: 'lorem ipsum',
    };

    return expect(messageModel.save(message)).to.be.rejectedWith(NonExistentForeignKeyError);
  });

  it('returns right error when provided room id does not exist', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      roomId: 'nonExistentRoomId',
      senderId: 'foo',
      text: 'lorem ipsum',
    };

    return messageModel.save(message)
      .catch((error) => {
        expect(error.getKey()).to.equal('roomId');
        expect(error.getValue()).to.equal('nonExistentRoomId');
      });
  });

  it('invalidates when provided text is not a string', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      roomId: 'existentRoomId',
      senderId: 'foo',
      text: 123,
    };

    return expect(messageModel.save(message)).to.be.rejectedWith(ValidationError);
  });
});
