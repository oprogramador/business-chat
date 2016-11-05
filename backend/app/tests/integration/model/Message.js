import MessageModel from 'business-chat-backend/model/Message';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import { db } from 'business-chat-backend/servicesManager';
import expect from 'business-chat-backend/tests/expect';

const DATABASE_NOT_FOUND = 1228;

const createDefaultMessageModel = () => new MessageModel({
  roomIdValidator: () => true,
});

describe('MessageModel', () => {
  beforeEach('recreate database', () => {
    db.useDatabase('_system');

    return db.dropDatabase('test')
      .catch(error => (error.errorNum === DATABASE_NOT_FOUND ? Promise.resolve() : Promise.reject(error)))
      .then(() => db.createDatabase('test'))
      .then(() => db.useDatabase('test'))
      .then(() => db.collection('messages').create());
  });

  it('saves and retrieves object when it is valid', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      roomId: 'bar',
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
      roomId: 'bar',
      senderId: 'foo',
    };

    return expect(messageModel.save(message)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when there are additional fields', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      foo: 'bar',
      roomId: 'bar',
      senderId: 'foo',
      text: 'lorem ipsum',
    };

    return expect(messageModel.save(message)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when provided room id does not exist', () => {
  });

  it('invalidates when provided text is not a string', () => {
    const messageModel = createDefaultMessageModel();
    const message = {
      roomId: 'bar',
      senderId: 'foo',
      text: 123,
    };

    return expect(messageModel.save(message)).to.be.rejectedWith(ValidationError);
  });
});
