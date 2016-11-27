import InvalidInstanceError from 'business-chat-backend/errors/InvalidInstanceError';
import Message from 'business-chat-backend/model/Message';
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
    expect(() => new Message({ sender: new User({}), text: 123 })).to.throw(ValidationError);
  });

  it('throws InvalidInstanceError when provided sender is not an instance of User', () => {
    expect(() => new Message({ sender: {}, text: 'foo' })).to.throw(InvalidInstanceError);
  });

  it('succeeds when provided text is an empy string', () => {
    expect(() => new Message({ sender: new User({}), text: '' })).to.not.throw(Error);
  });

  it('succeeds when provided text is not empy string', () => {
    expect(() => new Message({ sender: new User({}), text: 'foo' })).to.not.throw(Error);
  });

  it('calls `validate` with the same arguments', () => {
    const validate = sandbox.spy(Message.prototype, 'validate');
    const object = { sender: new User({}), text: 'bar' };
    new Message(object);
    expect(validate.withArgs(object)).to.be.calledOnce();
  });

  it('assigns text', () => {
    const object = new Message({ sender: new User({}), text: 'foo-bar' });
    expect(object.getText()).to.equal('foo-bar');
  });

  it('assigns sender', () => {
    const sender = new User({});
    const object = new Message({ sender, text: 'foo-bar' });
    expect(object.getSender()).to.equal(sender);
  });
});
