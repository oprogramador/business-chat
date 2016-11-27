import User from 'business-chat-backend/model/User';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import expect from 'business-chat-backend/tests/expect';
import sinon from 'sinon';

let sandbox;

describe('User', () => {
  beforeEach('create sandbox', () => {
    sandbox = sinon.sandbox.create();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  it('throws ValidationError when provided username is not a string', () => {
    expect(() => new User({ username: 123 })).to.throw(ValidationError);
  });

  it('throws ValidationError when provided username is an empty string', () => {
    expect(() => new User({ username: '' })).to.throw(ValidationError);
  });

  it('succeeds when provided username is valid', () => {
    expect(() => new User({ username: 'foo' })).to.not.throw(Error);
  });

  it('calls `validate` with the same arguments', () => {
    const validate = sandbox.spy(User.prototype, 'validate');
    const object = { username: 'bar' };
    new User(object);
    expect(validate.withArgs(object)).to.be.calledOnce();
  });

  it('assigns username', () => {
    const object = new User({ username: 'foo-bar' });
    expect(object.getUsername()).to.equal('foo-bar');
  });
});
