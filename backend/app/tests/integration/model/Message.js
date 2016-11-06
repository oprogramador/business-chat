import MessageModel from 'business-chat-backend/model/Message';
import NonExistentForeignKeyError from 'business-chat-backend/errors/NonExistentForeignKeyError';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';

const createDefaultMessageModel = () => new MessageModel({
  validateRoomId: roomId => (roomId === 'existentRoomId' ? Promise.resolve() : Promise.reject()),
  validateSenderId: senderId => (senderId === 'existentSenderId' ? Promise.resolve() : Promise.reject()),
});

describe('MessageModel', () => {
  beforeEach('recreate database', () => {
    const messageModel = createDefaultMessageModel();
    const newDatabaseName = `test-${faker.random.uuid()}`;

    return messageModel.createDatabase(newDatabaseName)
      .then(() => messageModel.createCollection());
  });

  it('saves and retrieves object when it is valid', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      roomId: 'existentRoomId',
      senderId: 'existentSenderId',
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
      senderId: 'existentSenderId',
    };

    return expect(messageModel.save(message)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when there are additional fields', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      foo: 'bar',
      roomId: 'existentRoomId',
      senderId: 'existentSenderId',
      text: 'lorem ipsum',
    };

    return expect(messageModel.save(message)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when provided room id does not exist', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      roomId: 'nonExistentRoomId',
      senderId: 'existentSenderId',
      text: 'lorem ipsum',
    };

    return expect(messageModel.save(message)).to.be.rejectedWith(NonExistentForeignKeyError);
  });

  it('returns right error when provided room id does not exist', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      roomId: 'nonExistentRoomId',
      senderId: 'existentSenderId',
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
      senderId: 'existentSenderId',
      text: 123,
    };

    return expect(messageModel.save(message)).to.be.rejectedWith(ValidationError);
  });
});
