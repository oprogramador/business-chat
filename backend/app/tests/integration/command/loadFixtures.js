import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';
import serializer from 'business-chat-backend/services/serializer';

describe('loadFixtures command', () => {
  beforeEach('recreate database', () => {
    const dbName = `test-${faker.random.uuid()}`;

    return serializer.configure(dbName);
  });

  it('is fulfilled', () =>
    // eslint-disable-next-line global-require
    expect(require('business-chat-backend/command/loadFixtures')).to.be.fulfilled()
  );
});

