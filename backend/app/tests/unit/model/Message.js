import InvalidInstanceError from 'business-chat-backend/errors/InvalidInstanceError';
import Message from 'business-chat-backend/model/Message';
import Room from 'business-chat-backend/model/Room';
import User from 'business-chat-backend/model/User';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import expect from 'business-chat-backend/tests/expect';
import sinon from 'sinon';

let sandbox;

describe('Message', () => {
  beforeEach('create sandbox', () => {
    sandbox = sinon.sandbox.create();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  it('throws ValidationError when provided text is not a string', () => {
    expect(() => new Message({
      room: new Room({}),
      sender: new User({ username: 'alicia' }),
      text: 123,
    })).to.throw(ValidationError);
  });

  it('throws InvalidInstanceError when provided sender is not an instance of User', () => {
    expect(() => new Message({
      room: new Room({}),
      sender: {},
      text: 'foo',
    })).to.throw(InvalidInstanceError);
  });

  it('throws InvalidInstanceError when provided room is not an instance of Room', () => {
    expect(() => new Message({
      room: {},
      sender: new User({ username: 'alicia' }),
      text: 'foo',
    })).to.throw(InvalidInstanceError);
  });

  it('succeeds when provided text is an empy string', () => {
    expect(() => new Message({
      room: new Room({}),
      sender: new User({ username: 'alicia' }),
      text: '',
    })).to.not.throw(Error);
  });

  it('succeeds when provided text is not empy string', () => {
    expect(() => new Message({
      room: new Room({}),
      sender: new User({ username: 'alicia' }),
      text: 'foo',
    })).to.not.throw(Error);
  });

  it('calls `validate` with the same arguments', () => {
    const validate = sandbox.spy(Message.prototype, 'validate');
    const object = {
      room: new Room({}),
      sender: new User({ username: 'alicia' }),
      text: 'bar',
    };
    new Message(object);
    expect(validate.withArgs(object)).to.be.calledOnce();
  });

  it('assigns text', () => {
    const object = new Message({
      room: new Room({}),
      sender: new User({ username: 'alicia' }),
      text: 'foo-bar',
    });
    expect(object.getText()).to.equal('foo-bar');
  });

  it('assigns sender', () => {
    const sender = new User({ username: 'alicia' });
    const message = new Message({
      room: new Room({}),
      sender,
      text: 'foo-bar',
    });
    expect(message.getSender()).to.equal(sender);
  });

  it('assigns bidirectionally room', () => {
    const room = new Room({});
    const message = new Message({
      room,
      sender: new User({ username: 'alicia' }),
      text: 'foo-bar',
    });
    expect(message.getRoom()).to.equal(room);

    const messages = room.getMessages();
    expect(messages).to.have.length(1);
    expect(messages[0]).to.equal(message);
  });

  it('saves creation time', () => {
    const object = new Message({
      room: new Room({}),
      sender: new User({ username: 'alicia' }),
      text: 'foo-bar',
    });
    const createdAt = object.getCreatedAt();
    expect(createdAt).to.be.a('number');
    expect(createdAt).to.be.at.most(Date.now());
    const allowedOffset = 100;
    expect(createdAt).to.be.greaterThan(Date.now() - allowedOffset);

    return new Promise((resolve) => {
      const timeAfter = 100;
      setTimeout(() => {
        expect(object.getCreatedAt()).to.equal(createdAt);
        resolve();
      }, timeAfter);
    });
  });
});
