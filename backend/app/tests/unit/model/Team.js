import Team from 'business-chat-backend/model/Team';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import expect from 'business-chat-backend/tests/expect';
import sinon from 'sinon';

let sandbox;

describe('Team', () => {
  beforeEach('create sandbox', () => {
    sandbox = sinon.sandbox.create();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  it('throws ValidationError when provided team name is not a string', () => {
    expect(() => new Team({ name: 123 })).to.throw(ValidationError);
  });

  it('throws ValidationError when provided team name is an empty string', () => {
    expect(() => new Team({ name: '' })).to.throw(ValidationError);
  });

  it('succeeds when provided team name is valid', () => {
    expect(() => new Team({ name: 'foo' })).to.not.throw(Error);
  });

  it('calls `validate` with the same arguments', () => {
    const validate = sandbox.spy(Team.prototype, 'validate');
    const object = { name: 'bar' };
    new Team(object);
    expect(validate.withArgs(object)).to.be.calledOnce();
  });

  it('assigns name', () => {
    const object = new Team({ name: 'foo-bar' });
    expect(object.getName()).to.equal('foo-bar');
  });
});
