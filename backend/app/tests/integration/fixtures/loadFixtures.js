import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';
import loadFixtures from 'business-chat-backend/fixtures/loadFixtures';
import serializer from 'business-chat-backend/services/serializer';

describe('loadFixtures', () => {
  beforeEach('recreate database', () => {
    const dbName = `test-${faker.random.uuid()}`;

    return serializer.configure(dbName);
  });

  it('creates defaults', () => {
    const defaultRoom = serializer.create({ id: 'default-room' });
    const defaultTeam = serializer.create({ id: 'default-team' });

    return loadFixtures()
      .then(() => defaultRoom.reload())
      .then(() => defaultTeam.reload())
      .then(() => expect(defaultRoom.getName()).to.equal('default'))
      .then(() => expect(defaultTeam.getName()).to.equal('default'));
  });
});
