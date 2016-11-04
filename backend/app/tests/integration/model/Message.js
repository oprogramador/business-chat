import Message from 'business-chat-backend/model/Message';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import { db } from 'business-chat-backend/servicesManager';
import expect from 'business-chat-backend/tests/expect';

const DATABASE_NOT_FOUND = 1228;

describe('Message', () => {
  beforeEach('recreate database', () => {
    db.useDatabase('_system');

    return db.dropDatabase('test')
      .catch(error => (error.errorNum === DATABASE_NOT_FOUND ? Promise.resolve() : Promise.reject(error)))
      .then(() => db.createDatabase('test'))
      .then(() => db.useDatabase('test'))
      .then(() => db.collection('messages').create());
  });

  it('saves and retrieves object when it is valid', () => {
    const message = {
      roomId: 'bar',
      senderId: 'foo',
      text: 'lorem ipsum',
    };

    return Message.save(message)
      .then(result => Message.find(result.id))
      .then(result => expect(result).to.containSubset(message));
  });

  it('invalidates when authentication fails');
  it('invalidates when there are missing fields', () => {
    const message = {
      roomId: 'bar',
      senderId: 'foo',
    };

    return expect(Message.save(message)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when there are additional fields');
  it('invalidates when provided room id does not exist');
  it('invalidates when provided text is not a string');
});
