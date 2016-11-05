import NonExistentForeignKeyError from 'business-chat-backend/errors/NonExistentForeignKeyError';
import expect from 'business-chat-backend/tests/expect';

describe('NonExistentForeignKeyError', () => {
  it('provides key', () => {
    const error = new NonExistentForeignKeyError({ key: 'foo', value: 'bar' });

    expect(error.getKey()).to.equal('foo');
  });

  it('provides value', () => {
    const error = new NonExistentForeignKeyError({ key: 'foo', value: 'bar' });

    expect(error.getValue()).to.equal('bar');
  });
});
